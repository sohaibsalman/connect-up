import React from 'react';
import getMembers from '../actions/connectActions';
import MemberCard from './MemberCard';

export default async function MatchesPage() {
  const members = await getMembers();

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6'>
      {members?.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}
