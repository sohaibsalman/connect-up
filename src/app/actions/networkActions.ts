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

export async function getFollowedMembers(type = 'followings') {
  try {
    const userId = await getCurrentUserId();

    switch (type) {
      case 'followings':
        return await getFollowings(userId);
      case 'followers':
        return await getFollowers(userId);
      case 'mutual':
        return await getMutualFollowers(userId);

      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getFollowings(userId: string) {
  const sourceFollowers = await prisma.network.findMany({
    where: {
      sourceUserId: userId,
    },
    select: {
      targetMember: true,
    },
  });

  return sourceFollowers.map((x) => x.targetMember);
}

async function getFollowers(userId: string) {
  const targetFollowers = await prisma.network.findMany({
    where: {
      targetUserId: userId,
    },
    select: {
      sourceMember: true,
    },
  });

  return targetFollowers.map((x) => x.sourceMember);
}

async function getMutualFollowers(userId: string) {
  const followedUsers = await prisma.network.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });

  const followedIds = followedUsers.map((x) => x.targetUserId);

  const mutualFollowers = await prisma.network.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: followedIds } }],
    },
    select: {
      sourceMember: true,
    },
  });

  return mutualFollowers.map((x) => x.sourceMember);
}
