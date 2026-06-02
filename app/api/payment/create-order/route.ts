import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { auth } from '@/auth';
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/lib/models/User';
import { Transaction } from '@/app/lib/models/Transaction';

const PRICE_USD = 60;
const COUPON_CODE = 'CLAUDEEXAM';
const COUPON_USD = 30; // 50% off
const USD_TO_INR = 84;

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
  const isIndia: boolean = body.isIndia === true;
  const isValidCoupon = coupon === COUPON_CODE;

  const priceUSD = isValidCoupon ? COUPON_USD : PRICE_USD;
  const currency = isIndia ? 'INR' : 'USD';
  const amount = isIndia ? Math.round(priceUSD * USD_TO_INR) : priceUSD;

  await connectDB();
  const dbUser = await User.findOne({ email: session.user.email });
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  if (dbUser.hasPremiumAccess) {
    return NextResponse.json({ error: 'Already purchased' }, { status: 400 });
  }

  // Razorpay accepts amounts in smallest currency unit (paise for INR, cents for USD)
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency,
    receipt: `rcpt_${Date.now()}`,
  });

  await Transaction.create({
    userId: dbUser._id,
    email: dbUser.email,
    razorpayOrderId: order.id,
    amount,
    currency,
    couponCode: isValidCoupon ? coupon : undefined,
    couponDiscount: isValidCoupon ? (isIndia ? Math.round((PRICE_USD - COUPON_USD) * USD_TO_INR) : PRICE_USD - COUPON_USD) : undefined,
  });

  return NextResponse.json({
    orderId: order.id,
    amount,
    currency,
    couponApplied: isValidCoupon,
    key: process.env.RAZORPAY_KEY_ID!,
  });
}
