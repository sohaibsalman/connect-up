import React from 'react';
import { CardHeader, Divider, CardBody } from '@nextui-org/react';

type Props = {
  params: { userId: string };
};

export default async function ChatPage({ params }: Props) {
  return (
    <>
      <CardHeader>
        <span className='text-2xl text-primary font-semibold'>Chats</span>
      </CardHeader>
      <Divider />
      <CardBody>Chat goes here</CardBody>
    </>
  );
}
