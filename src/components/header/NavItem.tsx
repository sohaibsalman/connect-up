'use client';
import React from 'react';
import Link from 'next/link';
import { NavbarItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

type Props = {
  icon: React.ReactNode;
  title: string;
  href: string;
};

export default function NavItem({ icon, title, href }: Props) {
  const pathname = usePathname();

  return (
    <NavbarItem
      as={Link}
      href={href}
      className='flex justify-center items-center flex-col data-[active]:text-primary'
      isActive={pathname === href}
    >
      {icon}
      <span className='text-sm'>{title}</span>
    </NavbarItem>
  );
}
