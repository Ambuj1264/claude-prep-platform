import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/lib/models/User';
import { realQuestions } from '@/app/lib/data/realQuestions';

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const dbUser = await User.findOne({ email: session.user.email });

  if (!dbUser?.hasPremiumAccess) {
    return NextResponse.json({ error: 'Premium access required' }, { status: 403 });
  }

  return NextResponse.json({ questions: realQuestions });
}
