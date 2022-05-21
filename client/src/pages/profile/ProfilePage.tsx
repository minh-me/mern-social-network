import { Box, Divider } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

import { Title } from 'components/App';
import { ProfilePostList } from './ProfilePostList';
import { ProfileHeader } from './ProfileHeader';
import { ProfileTabs } from './components/ProfileTabs';
import { useUserProfile } from 'RQhooks';
import { ProfileHeaderSkeleton } from 'components/Common/Variants';
import { ProfileReplies } from './ProfileReplies';
import { useAuthContext } from 'hooks/useAppContext';
import { UserProfile } from 'interface';

export const ProfilePage = () => {
  let { username } = useParams();
  const { auth } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();

  username = auth?.username === username ? 'profile' : username;

  const { data: user, isLoading } = useUserProfile(
    { username },
    { cacheTime: username === 'profile' ? 2 * 60 * 1000 : 5 * 60 * 1000 }
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
      {!isTabReplies && user && <ProfilePostList userId={user.id} />}
    </>
  );
};
