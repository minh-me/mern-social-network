import { memo } from 'react';
import { Box } from '@mui/material';
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';

import { useAppContext } from 'hooks/useAppContext';
import { UserProfile } from 'interface';
import { FollowButton, IconsButtonOutlined } from 'components/Common/Buttons';
import { ProfileFollowers } from './components/ProfileFollowers';
import { ProfileInfo } from './components/ProfileInfo';
import { ProfilePhoto } from './components/ProfilePhoto';

type Props = {
  user: UserProfile;
};

export const ProfileHeader = memo(({ user }: Props) => {
  const { state } = useAppContext();
  const { auth } = state;

  const followerIds = user.followers.map((user) => user.id);
  const followingIds = user.following.map((user) => user.id);

  let isFollowing = false;
  if (auth?.id) isFollowing = followerIds.includes(auth.id);

  return (
    <>
      <ProfilePhoto
        coverPhoto={user?.coverPhoto?.pc || user?.coverPhoto?.url}
        profilePic={user.profilePic.url}
      />

      {/* Profile buttons */}
      {auth && user.id !== auth.id ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} px={2} mt={2}>
            <IconsButtonOutlined>
              <LocalPostOfficeRoundedIcon fontSize="small" />
            </IconsButtonOutlined>
            <FollowButton isFollowing={isFollowing} userId={user.id} />
          </Box>
        </>
      ) : (
        <Box my={7} />
      )}
      <ProfileInfo name={user.name} email={user.email} />
      <ProfileFollowers username={user.username} followers={followerIds} following={followingIds} />
    </>
  );
});
