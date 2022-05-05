import { Box, Divider, Typography } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

import { Title } from 'components/App';
import { ProfilePostList } from './ProfilePostList';
import { ProfileHeader } from './ProfileHeader';
import { ProfileTabs } from './components/ProfileTabs';
import { useGetPofile } from 'RQhooks';
import { ProfileHeaderSkeleton } from 'components/Common/Variants';
import { ProfileReplies } from './ProfileReplies';

export const ProfilePage = () => {
  const { username } = useParams();
  const { data: user, isLoading } = useGetPofile(
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
