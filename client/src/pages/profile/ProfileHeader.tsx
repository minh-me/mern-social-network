import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';

import { useAuthContext } from '~/hooks/useAppContext';
import { UserProfile } from '~/interface';
import { FollowButton, IconsButtonOutlined } from '~/components/Common/Buttons';
import { useCreateChat } from '~/RQhooks/chat.rq';

import { ProfileFollowers } from './components/ProfileFollowers';
import { ProfileInfo } from './components/ProfileInfo';
import { ProfilePhoto } from './components/ProfilePhoto';

type Props = {
  user: UserProfile;
};

export const ProfileHeader = memo(({ user }: Props) => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  const { mutateAsync, data } = useCreateChat();

  const followerIds = user.followers.map((user) => user.id);
  const followingIds = user.following.map((user) => user.id);

  let isFollowing = false;
  if (auth?.id) isFollowing = followerIds.includes(auth.id);

  const handleCreateChat = async () => {
    await mutateAsync({ users: [user.id], isGroupChat: false });
  };

  // Navigate chat
  useEffect(() => {
    if (data?.id) navigate(`/messages/${data.id}`);
  }, [data?.id, navigate]);

  return (
    <>
      <ProfilePhoto
        coverPhoto={user?.coverPhoto?.pc || user?.coverPhoto?.url}
        profilePic={user.profilePic.url}
      />

      {/* Profile buttons */}
      {auth && user.id !== auth.id ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} px={2} mt={2}>
          <IconsButtonOutlined>
            <LocalPostOfficeRoundedIcon onClick={handleCreateChat} fontSize="small" />
          </IconsButtonOutlined>
          <FollowButton isFollowing={isFollowing} userId={user.id} />
        </Box>
      ) : (
        <Box my={7} />
      )}

      <ProfileInfo name={user.name} email={user.email} />
      <ProfileFollowers username={user.username} followers={followerIds} following={followingIds} />
    </>
  );
});
