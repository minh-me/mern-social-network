import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography, Divider } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import { Title } from 'components/App';
import { useMyPosts } from 'RQhooks/post.rq';
import { PostList } from 'components/Common';
import { Tab } from 'components/Common/Buttons';
import { PostSkeleton } from 'components/Common/Variants';
import { ProfileHeader } from './ProfileHeader';
import { ProfileButtons } from './ProfileButtons';
import { ProfileInfo } from './ProfileInfo';
import { ProfileFollowers } from './ProfileFollowers';

export const ProfilePage = () => {
  const isSelectedPosts = true;

  const [limit, setLimit] = useState(8);
  const { ref, inView } = useInView();
  const { data, isLoading, isFetching } = useMyPosts({ limit });

  useEffect(() => {
    if (data?.info.totalResults && data.info.totalResults > limit && inView) {
      setLimit((prev) => prev + 6);
    }
  }, [inView, data?.info.totalResults, limit]);

  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Profile" />
      </Box>

      {/* Header */}
      <Box>
        <ProfileHeader />
        <ProfileButtons />
        <ProfileInfo />
        <ProfileFollowers />
      </Box>

      {/* Tab control */}
      <Box mt={4} mx={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Tab onClick={() => console.log('Clicked!')} text="Posts" active={true} />
        <Tab onClick={() => console.log('Clicked!')} text="Replies" active={!true} />
      </Box>

      <Divider sx={{ borderBottom: '1px solid #38444d', my: 2, mt: 4 }} />

      {/* {!isSelectedPosts && <UserList data={userFroms} />} */}
      {isSelectedPosts && (
        <>
          {/* PostList */}
          {isLoading ? <PostSkeleton /> : data && <PostList data={data} />}

          {/* Button  */}
          <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            {isFetching ? (
              <CircularProgress size={25} />
            ) : data?.info && data?.info.totalResults > limit ? (
              <Button ref={ref}>Load more</Button>
            ) : null}
          </Box>

          {data?.posts && data?.posts.length === 0 && (
            <Typography textAlign="center" fontSize={16}>
              Nothing to show.
            </Typography>
          )}
        </>
      )}
    </>
  );
};
