'use client';
import React from 'react';
import { Card, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';
import { Member } from '@prisma/client';

type Props = {
  member: Member;
};

export default function MemberCard({ member }: Props) {
  return (
    <Card isPressable fullWidth as={Link} href={`/members/${member.userId}`}>
      <Image
        isZoomed
        alt={member.name}
        className='aspect-square object-cover'
        src={member.image || '/images/user.png'}
        width='100%'
      />
      <CardFooter className='flex flex-col absolute bottom-0 z-10 bg-black text-white items-start bg-dark-gradient'>
        <span className='font-semibold'>{member.name}</span>
        <span className='text-sm'>{member.title}</span>
      </CardFooter>
    </Card>
  );
}
