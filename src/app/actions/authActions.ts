'use server';
import { AuthError } from 'next-auth';
import { auth, signIn, signOut } from '@/auth';
import bcryptjs from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { LoginSchema } from '@/lib/schemas/login-schema';
import { RegisterSchema, registerSchema } from '@/lib/schemas/register-schema';
import { ActionResult } from '@/types';
import { User } from '@prisma/client';

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { status: 'success', data: 'Logged in' };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { status: 'error', error: 'Invalid Credentials' };
        default:
          return { status: 'error', error: 'Something went wrong' };
      }
    } else {
      return { status: 'error', error: 'Server error' };
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: '/' });
}

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }

    const { fullName, email, password } = validated.data;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { status: 'error', error: 'User already exists' };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await prisma.user.create({
      data: { name: fullName, email, passwordHash: hashedPassword },
    });

    return { status: 'success', data: user };
  } catch (error) {
    console.log(error);
    return { status: 'error', error: 'Something went wrong' };
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getCurrentUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('Unauthorized');

  return userId;
}
