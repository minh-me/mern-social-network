import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { User } from '~/interface';
import { Title } from '~/components/App';
import { useUserProfile } from '~/RQhooks';
import { Tab } from '~/components/Common/Buttons/Tab';
import { UserListSkeleton } from '~/components/Common/Variants';
import { UserList } from '~/components/Common';

export const FollowPage = () => {
  const { username } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const selectedTab = location.pathname.split('/').slice(-1)[0] as 'followers' | 'following';

  const isTabFollowers = selectedTab === 'followers';

  const { data, isLoading } = useUserProfile({ username });

  if (isLoading || !data) return <UserListSkeleton />;

  const { followers, following, name } = data;

  return (
    <>
      {/* Title */}
      <Box sx={{ borderBottom: '1px solid #38444d' }}>{<Title title={name} />}</Box>

      {/* Tab control */}
      <Box mt={3} mx={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Tab
          onClick={() => navigate(`/users/${username}/following`)}
          text="Following"
          active={!isTabFollowers}
        />
        <Tab
          onClick={() => navigate(`/users/${username}/followers`)}
          text="Followers"
          active={isTabFollowers}
        />
      </Box>
      <Box sx={{ borderBottom: '1px solid #38444d' }} mb={2} mt={3} />

      <Box mx={2}>
        {isTabFollowers && followers && (
          <>
            <UserList users={followers} />

            {followers.length === 0 && (
              <Typography textAlign="center" fontSize={16}>
                Nothing to show.
              </Typography>
            )}
          </>
        )}
        {!isTabFollowers && following && (
          <>
            <UserList users={following as User[]} />
            {following.length === 0 && (
              <Typography textAlign="center" fontSize={16}>
                Nothing to show.
              </Typography>
            )}
          </>
        )}
      </Box>
    </>
  );
};
