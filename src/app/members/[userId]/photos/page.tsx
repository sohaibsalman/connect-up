import React from 'react';
import Link from 'next/link';
import {
  CardHeader,
  Divider,
  CardBody,
  Image,
  Button,
} from '@nextui-org/react';
import { AiOutlineEdit } from 'react-icons/ai';
import { getMemberPhotosByUserId } from '@/app/actions/memberActions';
import { getCurrentUserId } from '@/app/actions/authActions';
import MemberPhoto from '@/components/MemberPhoto';

type Props = {
  params: { userId: string };
};

export default async function PhotosPage({ params }: Props) {
  const photos = await getMemberPhotosByUserId(params.userId);
  const currentUserId = await getCurrentUserId();

  return (
    <>
      <CardHeader className='flex justify-between'>
        <span className='text-2xl text-primary font-semibold'>Photos</span>
        {currentUserId === params.userId && (
          <Button
            isIconOnly
            color='primary'
            as={Link}
            href={`/members/${params.userId}/photos/edit`}
          >
            <AiOutlineEdit size={22} />
          </Button>
        )}
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='grid grid-cols-5 gap-3'>
          {photos?.map((photo) => (
            <div key={photo.id}>
              <MemberPhoto photo={photo} />
            </div>
          ))}
        </div>
      </CardBody>
    </>
  );
}
