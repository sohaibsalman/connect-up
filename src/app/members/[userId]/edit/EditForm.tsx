'use client';
import React, { useEffect } from 'react';
import { Member } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MemberEditSchema,
  memberEditSchema,
} from '@/lib/schemas/member-edit-schema';
import { Button, Input, Textarea } from '@nextui-org/react';
import Link from 'next/link';
import { updateMemberProfile } from '@/app/actions/userActions';
import { toast } from 'react-toastify';
import { handleServerFormErrors } from '@/lib/utils';

type Props = {
  member: Member;
};

export default function EditForm({ member }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        title: member.title,
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  const onSubmit = async (data: MemberEditSchema) => {
    const result = await updateMemberProfile(data);

    if (result.status === 'success') {
      toast.success('Profile updated successfully');
    } else {
      handleServerFormErrors(result, setError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3'>
      <Input
        label='Full Name'
        variant='bordered'
        {...register('name')}
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Input
        label='Your Title'
        variant='bordered'
        {...register('title')}
        defaultValue={member.title}
        isInvalid={!!errors.title}
        errorMessage={errors.title?.message}
      />
      <Textarea
        label='Description'
        variant='bordered'
        {...register('description')}
        defaultValue={member.description}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={6}
      />
      <div className='flex gap-3'>
        <Input
          label='City'
          variant='bordered'
          {...register('city')}
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          label='Country'
          variant='bordered'
          {...register('country')}
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>

      {errors.root?.serverError && (
        <p className='text-danger'>{errors.root?.serverError.message}</p>
      )}

      <div className='flex flex-row-reverse gap-3'>
        <Button
          type='submit'
          color='primary'
          isLoading={isSubmitting}
          isDisabled={!isValid || !isDirty}
        >
          Update Profile
        </Button>
        <Button as={Link} href={`/members/${member.userId}`}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
