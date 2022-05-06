import { Box, Divider, Typography } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

import { Title } from 'components/App';
import { ProfilePostList } from './ProfilePostList';
import { ProfileHeader } from './ProfileHeader';
import { ProfileTabs } from './components/ProfileTabs';
import { useUserProfile } from 'RQhooks';
import { ProfileHeaderSkeleton } from 'components/Common/Variants';
import { ProfileReplies } from './ProfileReplies';
import { useAppContext } from 'hooks/useAppContext';

export const ProfilePage = () => {
  let { username } = useParams();
  const { state } = useAppContext();
  const { auth } = state;

  username = auth?.username === username ? 'profile' : username;
  const { data: user, isLoading } = useUserProfile(
    { username },
    { cacheTime: username === 'profile' ? 2 * 60 * 1000 : 5 * 60 * 1000 }
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const isTabReplies = searchParams.get('tab') === 'replies';
  console.log({ isTabReplies, isLoading });
  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Profile" />
      </Box>

      {/* Header */}

      {isLoading && <ProfileHeaderSkeleton />}

      {user ? (
        <>
          <ProfileHeader user={user} />
          <ProfileTabs isTabReplies={isTabReplies} setSearchParams={setSearchParams} />
        </>
      ) : (
        <Typography textAlign="center" fontSize={16}>
          Not found user
        </Typography>
      )}

      <Divider sx={{ borderBottom: '1px solid #38444d', my: 2, mt: 4 }} />

      {isTabReplies && user && <ProfileReplies userId={user.id} />}
      {!isTabReplies && user && <ProfilePostList userId={user.id} />}
    </>
  );
};
