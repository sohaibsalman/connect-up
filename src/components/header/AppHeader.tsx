import React from 'react';
import Link from 'next/link';
import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { SlCup, SlEnvolope, SlHome, SlStar } from 'react-icons/sl';
import { GiUnicorn } from 'react-icons/gi';
import { auth } from '@/auth';

import UserMenu from './UserMenu';
import NavItem from './NavItem';

export default async function AppHeader() {
  const session = await auth();

  return (
    <Navbar maxWidth='full' isBordered>
      <NavbarBrand className='text-2xl flex' as={Link} href='/'>
        <GiUnicorn className='text-4xl mr-2 text-primary' />
        <span>Connect</span>
        <span>Up</span>
      </NavbarBrand>

      {session?.user && (
        <NavbarContent justify='center' className='gap-6'>
          <NavItem icon={<SlHome size={30} />} title='Feed' href='/feed' />
          <NavItem icon={<SlCup size={30} />} title='Connect' href='/connect' />
          <NavItem
            icon={<SlStar size={30} />}
            title='Network'
            href='/network'
          />
          <NavItem
            icon={<SlEnvolope size={30} />}
            title='Messages'
            href='/messages'
          />
        </NavbarContent>
      )}

      <NavbarContent justify='end'>
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <>
            <Button color='primary' variant='bordered' as={Link} href='/login'>
              Login
            </Button>
            <Button
              color='primary'
              variant='bordered'
              as={Link}
              href='/register'
            >
              Register
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
