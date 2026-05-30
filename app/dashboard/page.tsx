import { auth } from '@/auth';
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/lib/models/User';
import { Transaction, ITransaction } from '@/app/lib/models/Transaction';
import { redirect } from 'next/navigation';
import { DashboardClient } from './DashboardClient';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/');

  await connectDB();
  const dbUser = await User.findOne({ email: session.user.email });
  if (!dbUser) redirect('/');

  const transactions = await Transaction.find({ userId: dbUser._id }).sort({ createdAt: -1 }).lean<ITransaction[]>();

  const serialized = transactions.map(t => ({
    id: t._id.toString(),
    orderId: t.razorpayOrderId,
    paymentId: t.razorpayPaymentId ?? null,
    amount: t.amount,
    currency: t.currency,
    status: t.status,
    couponCode: t.couponCode ?? null,
    couponDiscount: t.couponDiscount ?? null,
    createdAt: t.createdAt.toISOString(),
  }));

  return (
    <DashboardClient
      user={{
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image ?? null,
        hasPremiumAccess: dbUser.hasPremiumAccess,
      }}
      transactions={serialized}
    />
  );
}
