'use client';
import React from 'react';
import { Session } from 'next-auth';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from '@nextui-org/react';
import { signOutUser } from '@/app/actions/authActions';

type Props = {
  user: Session['user'];
};

export default function UserMenu({ user }: Props) {
  return (
    <div className='flex items-center gap-4'>
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avatar
            isBordered
            as='button'
            className='transition-transform'
            src={user?.image ?? '/images/user.png'}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='User Menu' variant='flat'>
          <DropdownItem
            key='signed_in_as'
            className='h-14 gap-2'
            textValue='Signed in as'
          >
            <p className='font-semibold'>Signed in as</p>
            <p className='font-semibold'>{user?.email}</p>
          </DropdownItem>
          <DropdownItem key='profile' textValue='Profile'>
            Profile
          </DropdownItem>
          <DropdownItem key='settings' textValue='Settings'>
            Settings
          </DropdownItem>
          <DropdownItem
            key='logout'
            color='danger'
            textValue='Log Out'
            onClick={async () => await signOutUser()}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
