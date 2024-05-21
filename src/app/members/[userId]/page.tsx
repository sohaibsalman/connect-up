import React from 'react';
import { CardBody, CardHeader, Divider } from '@nextui-org/react';
import { notFound } from 'next/navigation';
import { getMemberUserId } from '@/app/actions/memberActions';

type Props = {
  params: { userId: string };
};

export default async function UserDetailPage({ params }: Props) {
  const member = await getMemberUserId(params.userId);

  if (!member) return notFound();

  return (
    <>
      <CardHeader>
        <span className='text-2xl text-primary font-semibold'>Profile</span>
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </>
  );
}
