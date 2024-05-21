import React from 'react';
import { CardHeader, Divider, CardBody, Image } from '@nextui-org/react';
import { getMemberPhotosByUserId } from '@/app/actions/memberActions';

type Props = {
  params: { userId: string };
};

export default async function PhotosPage({ params }: Props) {
  const photos = await getMemberPhotosByUserId(params.userId);

  return (
    <>
      <CardHeader>
        <span className='text-2xl text-primary font-semibold'>Photos</span>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='grid grid-cols-5 gap-3'>
          {photos?.map((photo) => (
            <div key={photo.id}>
              <Image
                width={200}
                height={200}
                alt={`photo of member ${photo.memberId}`}
                src={photo.url}
                className='object-cover aspect-square'
              />
            </div>
          ))}
        </div>
      </CardBody>
    </>
  );
}
