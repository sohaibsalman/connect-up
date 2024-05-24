import React from 'react';
import {
  CardHeader,
  Divider,
  CardBody,
  Card,
  CardFooter,
  Button,
} from '@nextui-org/react';
import { getCurrentUserId } from '@/app/actions/authActions';
import { getMemberPhotosByUserId } from '@/app/actions/memberActions';
import { FiStar, FiTrash } from 'react-icons/fi';
import MemberAddImageButton from './MemberAddImageButton';
import MemberPhoto from '@/components/MemberPhoto';

export default async function PhotoEditPage() {
  const userId = await getCurrentUserId();
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className='flex justify-between items-center'>
        <span className='text-2xl text-primary font-semibold'>Edit Photos</span>
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberAddImageButton />
        <div className='grid grid-cols-5 gap-3'>
          {photos?.map((photo) => (
            <>
              <Card shadow='sm' key={photo.id}>
                <CardBody className='overflow-visible p-0'>
                  <MemberPhoto photo={photo} />
                </CardBody>
                <CardFooter className='gap-2'>
                  <Button isIconOnly color='primary' className='flex-grow'>
                    <FiStar size={20} className='fill-white' />
                  </Button>
                  <Button isIconOnly color='danger' className='flex-grow'>
                    <FiTrash size={20} />
                  </Button>
                </CardFooter>
              </Card>
            </>
          ))}
        </div>
      </CardBody>
    </>
  );
}
