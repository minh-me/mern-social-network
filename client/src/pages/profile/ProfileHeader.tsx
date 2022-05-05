import { memo, useRef } from 'react';
import { Box } from '@mui/material';
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';

import { useAppContext } from 'hooks/useAppContext';
import { User } from 'interface';
import { FollowButton, IconsButtonOutlined } from 'components/Common/Buttons';
import { ProfileFollowers } from './components/ProfileFollowers';
import { ProfileInfo } from './components/ProfileInfo';
import { ProfilePhoto } from './components/ProfilePhoto';

type Props = {
  user: User;
};

export const ProfileHeader = memo(({ user }: Props) => {
  const { state } = useAppContext();
  const { auth } = state;
  console.log({ user });
  const countRef = useRef(0);
  return (
    <>
      {countRef.current++}

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
            <FollowButton user={user} />
          </Box>
        </>
      ) : (
        <Box my={7} />
      )}
      <ProfileInfo name={user.name} email={user.email} />
      <ProfileFollowers
        followers={user?.followers && user.followers}
        following={user?.following && user.following}
      />
    </>
  );
});
