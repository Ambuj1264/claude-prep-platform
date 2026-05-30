import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { auth } from '@/auth';
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/lib/models/User';
import { Transaction } from '@/app/lib/models/Transaction';

const PRICE_INR = 1;
const COUPON_CODE = 'CLAUDEEXAM';
const COUPON_PRICE_INR = 1;

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
  const amountINR = isValidCoupon ? COUPON_PRICE_INR : PRICE_INR;

  await connectDB();
  const dbUser = await User.findOne({ email: session.user.email });
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  if (dbUser.hasPremiumAccess) {
    return NextResponse.json({ error: 'Already purchased' }, { status: 400 });
  }

  // Razorpay accepts amounts in smallest currency unit; INR → paise
  const order = await razorpay.orders.create({
    amount: amountINR * 100,
    currency: 'INR',
    receipt: `rcpt_${Date.now()}`,
  });

  await Transaction.create({
    userId: dbUser._id,
    email: dbUser.email,
    razorpayOrderId: order.id,
    amount: amountINR,
    currency: 'INR',
    couponCode: isValidCoupon ? coupon : undefined,
    couponDiscount: isValidCoupon ? PRICE_INR - COUPON_PRICE_INR : undefined,
  });

  return NextResponse.json({
    orderId: order.id,
    amount: amountINR,
    currency: 'INR',
    couponApplied: isValidCoupon,
    key: process.env.RAZORPAY_KEY_ID!,
  });
}
