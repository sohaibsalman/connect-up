'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { addMemberPhoto } from '@/app/actions/userActions';
import ImageUploadButton from '@/components/ImageUploadButton';

export default function MemberAddImageButton() {
  const router = useRouter();

  const addImage = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === 'object') {
      await addMemberPhoto(result.info.url, result.info.public_id);
      router.refresh();
    } else {
      toast.error('Error uploading the image');
    }
  };

  return (
    <div className='py-5'>
      <ImageUploadButton onAddImage={addImage} />
    </div>
  );
}
