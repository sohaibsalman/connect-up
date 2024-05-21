import React from 'react';
import { Spinner } from '@nextui-org/react';

type Props = {
  label?: string;
};

export default function FullLoader({ label }: Props) {
  return (
    <div className='fixed inset-0 flex justify-center items-center'>
      <Spinner label={label || 'Loading...'} color='primary' />
    </div>
  );
}
