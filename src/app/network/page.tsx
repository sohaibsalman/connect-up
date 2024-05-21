import React from 'react';
import NetworkTab from './NetworkTab';
import {
  getCurrentUserFollowers,
  getFollowedMembers,
} from '../actions/networkActions';

type Props = {
  searchParams: { type: string };
};

export default async function NetworkPage({ searchParams }: Props) {
  const followedIds = await getCurrentUserFollowers();
  const members = await getFollowedMembers(searchParams.type);

  return (
    <div>
      <NetworkTab members={members} followedIds={followedIds} />
    </div>
  );
}
