import { memo, useState } from 'react';

import { useCommentsByAuthor } from 'RQhooks';
import { limitPosts } from 'contants/pagination';
import { PostSkeleton } from 'components/Common/Variants';
import { PostItem } from 'components/Common';

export const ProfileReplies = memo(({ userId }: { userId: string }) => {
  const [limit, setLimit] = useState(limitPosts);
  console.log({ userId });
  const { data, isLoading, isFetching } = useCommentsByAuthor({ author: userId, limit });

  if (isLoading || !data) return <PostSkeleton />;
  const { info, comments } = data;
  console.log({ comments });

  return (
    <>
      {/* PostList */}
      {comments.map((comm) => (
        <PostItem key={comm.id} post={comm.post} />
      ))}
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
