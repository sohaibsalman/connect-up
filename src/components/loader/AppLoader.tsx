import { Spinner } from '@nextui-org/react';

export default function AppLoader() {
  return (
    <div className='flex justify-center items-center h-full'>
      <Spinner label='Loading...' color='primary' labelColor='primary' />
    </div>
  );
}
