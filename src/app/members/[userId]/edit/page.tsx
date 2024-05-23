import React from 'react';
import { notFound } from 'next/navigation';
import { CardHeader, Divider, CardBody } from '@nextui-org/react';
import { getCurrentUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';
import EditForm from './EditForm';

export default async function EditPage({
  params,
}: {
  params: { userId: string };
}) {
  const currentUserId = await getCurrentUserId();
  const member = await getMemberByUserId(currentUserId);

  if (!member || params.userId !== currentUserId) return notFound();

  return (
    <>
      <CardHeader className='flex justify-between items-center'>
        <span className='text-2xl text-primary font-semibold'>
          Edit Profile
        </span>
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </>
  );
}
