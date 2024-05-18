'use client';
import React from 'react';
import Link from 'next/link';
import { Button, Card, CardBody, Image, Input } from '@nextui-org/react';
import { GiUnicorn } from 'react-icons/gi';
import { useForm } from 'react-hook-form';
import { LoginSchema, loginSchema } from '@/lib/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInUser } from '@/app/actions/authActions';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    console.log(result);
  };

  return (
    <Card className='w-full'>
      <CardBody>
        <div className='grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center'>
          <div className='relative col-span-6 md:col-span-4'>
            <Image
              alt='Album cover'
              className='object-cover'
              height={200}
              shadow='md'
              src='https://nextui.org/images/album-cover.png'
              width='100%'
            />
          </div>
          <div className='flex flex-col col-span-8 items-center justify-center'>
            <div>
              <div className='flex items-center'>
                <GiUnicorn size={50} className='text-primary' />
                <h3 className='text-2xl ml-3'>Welcome back to ConnectUp</h3>
              </div>
              <p className='my-4 text-lg text-center'>Login to your account</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-[70%]'>
              <div className='space-y-4'>
                <Input
                  defaultValue=''
                  size='lg'
                  label='Email'
                  variant='bordered'
                  color='primary'
                  radius='sm'
                  {...register('email')}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
                <Input
                  defaultValue=''
                  size='lg'
                  label='Password'
                  type='password'
                  variant='bordered'
                  color='primary'
                  radius='sm'
                  {...register('password')}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                />
                <div className='flex justify-end gap-3 !mt-8'>
                  <Button
                    as={Link}
                    href='/register'
                    variant='light'
                    color='primary'
                    size='lg'
                  >
                    Create account
                  </Button>
                  <Button
                    color='primary'
                    size='lg'
                    type='submit'
                    isDisabled={!isValid}
                    isLoading={isSubmitting}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
