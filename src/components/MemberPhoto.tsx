'use client';
import React from 'react';
import { Photo } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import { Image } from '@nextui-org/react';

type Props = {
  photo: Photo | null;
};

export default function MemberPhoto({ photo }: Props) {
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt='Image of member'
          src={photo.publicId}
          height={200}
          width={200}
          crop='fill'
          gravity='faces'
          className='rounded-2xl'
        />
      ) : (
        <Image
          width={200}
          height={200}
          alt={`photo of member ${photo?.memberId}`}
          src={photo?.url || '/images/user.png'}
          className='object-cover aspect-square'
        />
      )}
    </div>
  );
}
