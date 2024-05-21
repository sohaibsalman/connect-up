'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import { BiError } from 'react-icons/bi';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center vertical-center'>
      <Card className='w-3/5 mx-auto'>
        <CardHeader className='flex font-semibold justify-center text-2xl gap-2 text-primary'>
          <BiError size={30} />
          <h2>Something went wrong!</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='flex justify-center text-danger text-lg items-center'>
            {error.message}
          </div>
        </CardBody>
        <CardFooter className='flex justify-center'>
          <Button onClick={() => reset()}>Try again</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
