import { Box, Divider } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

import { Title } from '~/components/App';
import { useUserProfile } from '~/RQhooks';
import { ProfileHeaderSkeleton } from '~/components/Common/Variants';
import { useAuthContext } from '~/hooks/useAppContext';
import { UserProfile } from '~/interface';

import { ProfileTabs } from './components/ProfileTabs';
import { ProfilePostList } from './ProfilePostList';
import { ProfileHeader } from './ProfileHeader';
import { ProfileReplies } from './ProfileReplies';

export const ProfilePage = () => {
  const params = useParams();
  const { auth } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const username = auth?.username === params.username ? 'profile' : params.username;

  const { data: user, isLoading } = useUserProfile(
    { username },
    { cacheTime: username === 'profile' ? 5 * 60 * 1000 : 0.5 * 60 * 1000 }
  );

  if (isLoading || !user) {
    return (
      <>
        <Box sx={{ borderBottom: '1px solid #38444d' }}>
          <Title title="Profile" />
        </Box>
        <ProfileHeaderSkeleton />
      </>
    );
  }

  const isTabReplies = searchParams.get('tab') === 'replies';

  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Profile" />
      </Box>
      <ProfileHeader user={user as UserProfile} />
      <ProfileTabs isTabReplies={isTabReplies} setSearchParams={setSearchParams} />

      <Divider sx={{ borderBottom: '1px solid #38444d', my: 2, mt: 4 }} />

      {isTabReplies && user && <ProfileReplies userId={user.id} />}
      {!isTabReplies && user && (
        <ProfilePostList userId={params.username !== 'profile' ? user.id : ''} />
      )}
    </>
  );
};
