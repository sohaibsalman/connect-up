'use client';
import React from 'react';
import { Card, CardBody, Divider, Image } from '@nextui-org/react';
import { Member } from '@prisma/client';
import { CiLocationOn } from 'react-icons/ci';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  member: Member;
  currentUserId: string;
};

export default function MemberSidebar({ member, currentUserId }: Props) {
  const basePath = `/members/${member.userId}`;
  const pathname = usePathname();

  let navLinks = [
    {
      title: 'Profile',
      href: basePath,
    },
    {
      title: 'Photos',
      href: `${basePath}/photos`,
    },
    {
      title: 'Chat',
      href: `${basePath}/chat`,
    },
  ];

  if (member.userId === currentUserId) {
    navLinks = navLinks.filter((x) => x.title !== 'Chat');
  }

  return (
    <Card className='w-full items-center h-full py-8 px-4'>
      <Image
        width={170}
        height={170}
        alt={member.name}
        src={member.image || '/images/user.png'}
        className='rounded-full'
      />
      <CardBody>
        <div className='flex flex-col items-center text-center'>
          <div className='flex flex-col'>
            <span className='text-2xl font-semibold'>{member.name}</span>
            <span className='text-medium'>{member.title}</span>
          </div>
          <div className='flex items-center gap-1 mt-1 text-sm'>
            <CiLocationOn size={18} /> {`${member.city}, ${member.country}`}
          </div>
        </div>
        <Divider className='my-5' />
        <div className='flex flex-col text-2xl'>
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className={`block rounded p-2 ${
                pathname === link.href
                  ? 'text-primary'
                  : 'hover:text-primary/50'
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
