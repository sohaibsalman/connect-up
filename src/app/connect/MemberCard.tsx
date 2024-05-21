'use client';
import React from 'react';
import Link from 'next/link';
import { Card, CardFooter, Image } from '@nextui-org/react';
import { Member } from '@prisma/client';
import FollowButton from '@/components/FollowButton';

type Props = {
  member: Member;
  followedIds: string[];
};

export default function MemberCard({ member, followedIds }: Props) {
  const isFollowed = followedIds.includes(member.userId);

  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card isPressable fullWidth as={Link} href={`/members/${member.userId}`}>
      <Image
        isZoomed
        alt={member.name}
        className='aspect-square object-cover'
        src={member.image || '/images/user.png'}
        width='100%'
      />
      <div onClick={preventLinkAction}>
        <div className='absolute top-3 right-3 z-50'>
          <FollowButton targetUserId={member.userId} isFollowed={isFollowed} />
        </div>
      </div>
      <CardFooter className='flex flex-col absolute bottom-0 z-10 bg-black text-white items-start bg-dark-gradient'>
        <span className='font-semibold'>{member.name}</span>
        <span className='text-sm'>{member.title}</span>
      </CardFooter>
    </Card>
  );
}
