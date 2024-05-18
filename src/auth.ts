import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from './lib/prisma';
import { loginSchema } from './lib/schemas/login-schema';
import { getUserByEmail } from './app/actions/authActions';
import { compare } from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);

        if (!validated.success) return null;

        const { email, password } = validated.data;
        const user = await getUserByEmail(email);

        if (!user || !(await compare(password, user.passwordHash))) return null;

        return user;
      },
    }),
  ],
});
