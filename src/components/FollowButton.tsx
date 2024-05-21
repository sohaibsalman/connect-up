'use client';
import React, { useState } from 'react';
import { toggleFollowMember } from '@/app/actions/networkActions';
import { useRouter } from 'next/navigation';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Spinner } from '@nextui-org/react';

type Props = {
  targetUserId: string;
  isFollowed: boolean;
};

export default function FollowButton({ targetUserId, isFollowed }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function toggleFollow() {
    setIsLoading(true);
    await toggleFollowMember(targetUserId, isFollowed);
    setIsLoading(false);
    router.refresh();
  }

  return (
    <div
      onClick={toggleFollow}
      className='relative hover:opacity-80 transition cursor-pointer'
    >
      {isLoading ? (
        <Spinner size='sm' />
      ) : (
        <>
          <AiOutlineStar
            size={28}
            className='fill-white absolute -top-[2px] -right-[2px]'
          />
          <AiFillStar
            size={24}
            className={isFollowed ? 'fill-yellow-500' : 'fill-neutral-500/70'}
          />
        </>
      )}
    </div>
  );
}
