import { useState } from 'react';
import { pink } from '@mui/material/colors';
import { Box, Typography } from '@mui/material';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';

import { useProfilePosts } from '~/RQhooks';
import { limitPosts } from '~/constants/pagination';
import { LoadMoreInView } from '~/components/Common/Buttons';
import { PostItem, PostList } from '~/components/Common';
import { PostSkeleton } from '~/components/Common/Variants';

export const ProfilePostList = ({ userId = '' }) => {
  const [limit, setLimit] = useState(limitPosts);

  const { data, isLoading, isFetching } = useProfilePosts(
    { postedBy: userId, limit },
    { cacheTime: userId ? 0.5 * 60 * 1000 : 5 * 60 * 1000 }
  );

  if (isLoading || !data) return <PostSkeleton />;

  const { info, posts } = data;

  return (
    <>
      {posts.length > 0 && posts[0].pinned ? (
        <>
          {/* Pinned post */}
          <Box sx={{ borderBottom: '2px solid #38444d' }}>
            <Box sx={styles.PinnedPost}>
              <PushPinSharpIcon /> <Typography fontSize={12}>Pinned</Typography>
            </Box>
            <PostItem post={posts[0]} />
          </Box>

          {/* PostList */}
          <PostList posts={posts.slice(1)} />
        </>
      ) : (
        <PostList posts={posts} />
      )}

      {/* Button  */}
      {info && (
        <LoadMoreInView
          isFetching={isFetching}
          limit={limit}
          onChangeLimit={(num) => setLimit(num)}
          totalResults={data.info.totalResults}
        />
      )}

      {/* Entries is empty */}
      {posts && posts.length === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )}
    </>
  );
};

const styles = {
  PinnedPost: {
    display: 'flex',
    alignItems: 'center',
    px: 5,
    justifyContent: 'flex-start',
    svg: { height: 12, width: 12 },
    color: pink[800],
  },
};
