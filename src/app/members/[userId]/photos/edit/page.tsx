import React from 'react';
import Link from 'next/link';
import { CardHeader, Divider, CardBody, Button } from '@nextui-org/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { getCurrentUserId } from '@/app/actions/authActions';
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from '@/app/actions/memberActions';
import MemberAddImageButton from './MemberAddImageButton';
import MemberPhotosList from '@/components/MemberPhotosList';

export default async function PhotoEditPage() {
  const userId = await getCurrentUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className='flex justify-between items-center'>
        <span className='text-2xl text-primary font-semibold'>Edit Photos</span>
        <Button
          isIconOnly
          color='primary'
          as={Link}
          href={`/members/${userId}/photos`}
        >
          <AiOutlineCheckCircle size={22} />
        </Button>
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberAddImageButton />
        <MemberPhotosList
          photos={photos}
          editing={true}
          mainPhotoUrl={member?.image}
        />
      </CardBody>
    </>
  );
}
