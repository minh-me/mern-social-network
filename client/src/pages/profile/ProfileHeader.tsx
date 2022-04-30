import { ProfileHeaderSkeleton } from 'components/Common/Variants';
import { useRef } from 'react';
import { useGetPofile } from 'RQhooks';
import { ProfileButtons } from './components/ProfileButtons';
import { ProfileFollowers } from './components/ProfileFollowers';
import { ProfileInfo } from './components/ProfileInfo';
import { ProfilePhoto } from './components/ProfilePhoto';

export const ProfileHeader = () => {
  const { data, isLoading } = useGetPofile();
  console.log({ data });
  const countRef = useRef(0);
  return (
    <>
      {countRef.current++}
      {isLoading ? (
        <ProfileHeaderSkeleton />
      ) : data ? (
        <>
          <ProfilePhoto coverPhoto={data?.coverPhoto?.url} profilePic={data.profilePic.url} />
          <ProfileButtons />
          <ProfileInfo name={data.name} email={data.email} />
          <ProfileFollowers
            followers={data?.follwers && data.follwers}
            following={data?.following && data.following}
          />
        </>
      ) : null}
    </>
  );
};
