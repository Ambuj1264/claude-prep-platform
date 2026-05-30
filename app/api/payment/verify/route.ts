import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { auth } from '@/auth';
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/lib/models/User';
import { Transaction } from '@/app/lib/models/Transaction';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  await connectDB();

  await Transaction.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id, email: session.user.email },
    { razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature, status: 'paid' }
  );

  await User.findOneAndUpdate(
    { email: session.user.email },
    { hasPremiumAccess: true }
  );

  return NextResponse.json({ success: true });
}
