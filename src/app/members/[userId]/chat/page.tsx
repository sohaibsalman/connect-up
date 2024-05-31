import React from 'react';
import { CardHeader, Divider, CardBody, CardFooter } from '@nextui-org/react';
import ChatForm from './ChatForm';

type Props = {
  params: { userId: string };
};

export default async function ChatPage({ params }: Props) {
  return (
    <>
      <CardHeader>
        <span className='text-2xl text-primary font-semibold'>Chat</span>
      </CardHeader>
      <Divider />
      <CardBody>Chat goes here</CardBody>
      <CardFooter>
        <ChatForm />
      </CardFooter>
    </>
  );
}
