import { memo, useRef, useState } from 'react';
import { Typography } from '@mui/material';

import { useCommentsByAuthor } from 'RQhooks';
import { limitPosts } from 'contants/pagination';
import { LoadMoreInView } from 'components/App';
import { PostSkeleton } from 'components/Common/Variants';
import { PostItem, PostList } from 'components/Common';

export const ProfileReplies = memo(({ userId }: { userId: string }) => {
  const [limit, setLimit] = useState(limitPosts);
  console.log({ userId });
  const { data, isLoading, isFetching } = useCommentsByAuthor({ author: userId, limit });

  const countRef = useRef(0);
  if (isLoading || !data) return <PostSkeleton />;
  const { info, comments } = data;
  console.log({ comments });

  return (
    <>
      {/* PostList */}
      {comments.map((comm) => (
        <PostItem key={comm.id} post={comm.post} />
      ))}
      {countRef.current++}
      {/* Button  */}
      {/* {info && (
        <LoadMoreInView
          isFetching={isFetching}
          limit={limit}
          onChangeLimit={(num) => setLimit(num)}
          totalResults={data.info.totalResults}
        />
      )} */}
      {/* Entries is empty
      {posts && posts.length === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )} */}
    </>
  );
});
