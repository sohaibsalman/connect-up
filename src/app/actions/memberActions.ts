'use server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Photo } from '@prisma/client';

export async function getMembers() {
  const session = await auth();

  if (!session?.user) return null;

  try {
    return prisma.member.findMany({
      where: {
        NOT: { userId: session.user.id },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    return prisma.member.findUnique({
      where: { userId: userId },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMemberPhotosByUserId(userId: string) {
  try {
    const memberPhotos = await prisma.member.findUnique({
      where: { userId: userId },
      select: { photos: true },
    });

    if (!memberPhotos) return [];

    return memberPhotos.photos.map((photo) => photo) as Photo[];
  } catch (error) {
    console.log(error);
  }
}
