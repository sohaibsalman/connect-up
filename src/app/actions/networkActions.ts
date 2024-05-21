'use server';
import { prisma } from '@/lib/prisma';
import { getCurrentUserId } from './authActions';

export async function toggleFollowMember(
  targetUserId: string,
  isFollowed: boolean
) {
  try {
    const userId = await getCurrentUserId();

    if (isFollowed) {
      await prisma.network.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
    } else {
      await prisma.network.create({
        data: {
          sourceUserId: userId,
          targetUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCurrentUserFollowers() {
  try {
    const userId = await getCurrentUserId();

    const followerIds = await prisma.network.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });

    return followerIds.map((follower) => follower.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
