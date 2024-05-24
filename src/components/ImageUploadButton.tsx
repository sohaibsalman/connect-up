'use client';
import React from 'react';
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { HiPhoto } from 'react-icons/hi2';

type Props = {
  onAddImage: (result: CloudinaryUploadWidgetResults) => void;
};

export default function ImageUploadButton({ onAddImage }: Props) {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={onAddImage}
      signatureEndpoint='/api/sign-image'
      uploadPreset='connect-up'
      className='flex items-center gap-2 bg-primary text-white rounded-lg py-2 px-4 hover:bg-primary/70'
    >
      <HiPhoto size={20} /> Upload new image
    </CldUploadButton>
  );
}
