'use client';
import React, { Key, useTransition } from 'react';
import { Tab, Tabs } from '@nextui-org/react';
import { Member } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MemberCard from '../connect/MemberCard';
import FullLoader from '@/components/loader/FullLoader';

type Props = {
  members: Member[];
  followedIds: string[];
};

export default function NetworkTab({ members, followedIds }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    {
      id: 'followings',
      label: 'My Followings',
    },
    {
      id: 'followers',
      label: 'My Followers',
    },
    {
      id: 'mutual',
      label: 'Mutual Connections',
    },
  ];

  const handleTabChange = (key: Key) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('type', key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className='flex w-full flex-col mt-10 gap-5'>
      <Tabs
        aria-label='Followers tab'
        items={tabs}
        color='primary'
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <FullLoader />
            ) : members.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6'>
                {members.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    followedIds={followedIds}
                  />
                ))}
              </div>
            ) : (
              <div>No members found.</div>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
