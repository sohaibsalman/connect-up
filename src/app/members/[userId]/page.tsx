import React from 'react';
import { Button, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { notFound } from 'next/navigation';
import { getMemberByUserId } from '@/app/actions/memberActions';
import { AiOutlineEdit } from 'react-icons/ai';
import Link from 'next/link';
import { auth } from '@/auth';
import { getCurrentUserId } from '@/app/actions/authActions';

type Props = {
  params: { userId: string };
};

export default async function UserDetailPage({ params }: Props) {
  const member = await getMemberByUserId(params.userId);
  const currentUserId = await getCurrentUserId();

  if (!member) return notFound();

  return (
    <>
      <CardHeader className='flex justify-between items-center'>
        <span className='text-2xl text-primary font-semibold'>Profile</span>
        {currentUserId === params.userId && (
          <Button
            isIconOnly
            color='primary'
            as={Link}
            href={`/members/${params.userId}/edit`}
          >
            <AiOutlineEdit size={22} />
          </Button>
        )}
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </>
  );
}
