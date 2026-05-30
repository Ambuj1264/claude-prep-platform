import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/lib/models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
  basePath: '/api/user/auth',
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'google') return false;
      try {
        await connectDB();
        const existing = await User.findOne({ email: user.email });
        if (!existing) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            googleId: account.providerAccountId,
          });
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      if (session.user?.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          (session.user as typeof session.user & { id: string; hasPremiumAccess: boolean }).id = dbUser._id.toString();
          (session.user as typeof session.user & { hasPremiumAccess: boolean }).hasPremiumAccess = dbUser.hasPremiumAccess;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
