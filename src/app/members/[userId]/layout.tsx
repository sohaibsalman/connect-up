import React from 'react';
import { notFound } from 'next/navigation';
import { getMemberByUserId } from '@/app/actions/memberActions';
import MemberSidebar from '../MemberSidebar';
import { Card } from '@nextui-org/react';

type Props = {
  children: React.ReactNode;
  params: { userId: string };
};

export default async function Layout({ children, params }: Props) {
  const member = await getMemberByUserId(params.userId);

  if (!member) return notFound();

  return (
    <div className='grid grid-cols-12 gap-5 mt-10 h-[80vh]'>
      <div className='col-span-3'>
        <MemberSidebar member={member} />
      </div>
      <div className='col-span-9'>
        <Card className='h-full px-4'>{children}</Card>
      </div>
    </div>
  );
}
