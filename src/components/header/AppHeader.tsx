import React from 'react';
import Link from 'next/link';
import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { GiUnicorn } from 'react-icons/gi';

export default function AppHeader() {
  return (
    <Navbar maxWidth='full' isBordered>
      <NavbarBrand className='text-2xl flex' as={Link} href='/'>
        <GiUnicorn className='text-4xl mr-2' />
        <span>Connect</span>
        <span>Up</span>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <Button color='primary' variant='bordered' as={Link} href='/login'>
          Login
        </Button>
        <Button color='primary' variant='bordered' as={Link} href='/register'>
          Register
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
