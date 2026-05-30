import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { auth } from '@/auth';
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/lib/models/User';
import { Transaction } from '@/app/lib/models/Transaction';

const PRICE_USD = 60;
const COUPON_CODE = 'CLAUDEEXAM';
const COUPON_PRICE_USD = 50;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const coupon: string = (body.coupon ?? '').trim().toUpperCase();
  const isValidCoupon = coupon === COUPON_CODE;
  const amountUSD = isValidCoupon ? COUPON_PRICE_USD : PRICE_USD;

  await connectDB();
  const dbUser = await User.findOne({ email: session.user.email });
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  if (dbUser.hasPremiumAccess) {
    return NextResponse.json({ error: 'Already purchased' }, { status: 400 });
  }

  // Razorpay accepts amounts in smallest currency unit; USD → cents
  const order = await razorpay.orders.create({
    amount: amountUSD * 100,
    currency: 'USD',
    receipt: `rcpt_${Date.now()}`,
  });

  await Transaction.create({
    userId: dbUser._id,
    email: dbUser.email,
    razorpayOrderId: order.id,
    amount: amountUSD,
    currency: 'USD',
    couponCode: isValidCoupon ? coupon : undefined,
    couponDiscount: isValidCoupon ? PRICE_USD - COUPON_PRICE_USD : undefined,
  });

  return NextResponse.json({
    orderId: order.id,
    amount: amountUSD,
    currency: 'USD',
    couponApplied: isValidCoupon,
  });
}
