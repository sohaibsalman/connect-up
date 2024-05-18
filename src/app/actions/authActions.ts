'use server';
import { prisma } from '@/lib/prisma';
import { RegisterSchema, registerSchema } from '@/lib/schemas/register-schema';
import { ActionResult } from '@/types';
import { User } from '@prisma/client';
import bcryptjs from 'bcryptjs';

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
