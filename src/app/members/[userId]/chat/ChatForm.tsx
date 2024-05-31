'use client';
import React from 'react';
import { MessageSchema, messageSchema } from '@/lib/schemas/message-schema';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { HiPaperAirplane } from 'react-icons/hi2';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { createMessage } from '@/app/actions/messageActions';
import { handleServerFormErrors } from '@/lib/utils';

export default function ChatForm() {
  const router = useRouter();
  const params = useParams<{ userId: string }>();

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage(params.userId, data);

    if (result.status === 'success') {
      reset();
      router.refresh();
    } else {
      handleServerFormErrors(result, setError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <div className='flex items-center gap-2'>
        <Input
          fullWidth
          placeholder='Type a message'
          variant='faded'
          {...register('text')}
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
        />
        <Button
          type='submit'
          isIconOnly
          color='primary'
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
        >
          <HiPaperAirplane size={18} />
        </Button>
      </div>
      <div className='flex flex-col'>
        {errors.root?.serverError && (
          <p className='text-danger'>{errors.root?.serverError.message}</p>
        )}
      </div>
    </form>
  );
}
