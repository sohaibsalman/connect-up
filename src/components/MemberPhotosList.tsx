'use client';
import React, { useState } from 'react';
import { Photo } from '@prisma/client';
import { Card, CardBody, CardFooter, Button } from '@nextui-org/react';
import { FiStar, FiTrash } from 'react-icons/fi';
import MemberPhoto from './MemberPhoto';
import { useRouter } from 'next/navigation';
import { setMainPhoto } from '@/app/actions/userActions';

type Props = {
  photos: Photo[] | null;
  editing?: boolean;
  mainPhotoUrl?: string | null;
};

export default function MemberPhotosList({
  photos,
  editing,
  mainPhotoUrl,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState({
    type: '',
    isLoading: false,
    id: '',
  });

  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainPhotoUrl) return null;

    setLoading({ isLoading: true, id: photo.id, type: 'main' });
    await setMainPhoto(photo.url);
    router.refresh();
    setLoading({ isLoading: false, id: '', type: '' });
  };

  return (
    <div className='grid grid-cols-5 gap-3'>
      {photos?.map((photo) => (
        <Card shadow='sm' key={photo.id}>
          <CardBody className='overflow-visible p-0'>
            <MemberPhoto photo={photo} />
          </CardBody>
          {editing && (
            <CardFooter className='gap-2'>
              <Button
                isIconOnly
                color='default'
                className='flex-grow'
                onClick={() => onSetMain(photo)}
                isLoading={
                  loading.isLoading &&
                  loading.type === 'main' &&
                  loading.id === photo.id
                }
              >
                <FiStar
                  size={20}
                  className={
                    photo.url === mainPhotoUrl
                      ? 'fill-primary text-primary'
                      : 'fill-white'
                  }
                />
              </Button>
              <Button isIconOnly color='danger' className='flex-grow'>
                <FiTrash size={20} />
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
