'use server';

import {
  MemberEditSchema,
  memberEditSchema,
} from '@/lib/schemas/member-edit-schema';
import { ActionResult } from '@/types';
import { Member } from '@prisma/client';
import { getCurrentUserId } from './authActions';
import { prisma } from '@/lib/prisma';

export async function updateMemberProfile(
  data: MemberEditSchema
): Promise<ActionResult<Member>> {
  try {
    const validated = memberEditSchema.safeParse(data);

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }

    const userId = await getCurrentUserId();
    const { name, title, description, city, country } = validated.data;

    const member = await prisma.member.update({
      where: { userId },
      data: {
        name,
        title,
        description,
        city,
        country,
      },
    });

    return { status: 'success', data: member };
  } catch (error) {
    console.log(error);
    return { status: 'error', error: 'Something went wrong' };
  }
}

export async function addMemberPhoto(url: string, publicId: string) {
  try {
    const userId = await getCurrentUserId();

    await prisma.member.update({
      where: { userId },
      data: {
        photos: {
          create: [{ url, publicId }],
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}