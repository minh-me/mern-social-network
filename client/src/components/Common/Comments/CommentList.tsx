import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';

import { useComments } from '~/RQhooks';
import { Comment } from '~/interface';

import { CommentsSkeleton } from '../Variants/CommentSkeleton';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';

type Props = {
  postId: string;
  authorPost: string;
};

export const CommentList = ({ postId, authorPost }: Props) => {
  const [limit, setLimit] = useState(8);

  const { data, isLoading, isFetching } = useComments({ postId, limit });

  if (isLoading || !data) return <CommentsSkeleton />;

  const { comments, info } = data;

  console.log({ comments });

  const rootComments = comments.filter((comm: Comment) => !comm.parentId);

  const getReplies = (commentId: string) =>
    comments.filter((comm: Comment) => comm.parentId === commentId) || [];

  const numDesc = (num: number) => (num === 1 ? ' comment' : `${num} comments`);

  return (
    <>
      <Box my={2}>
        {limit <= 10 && <CommentForm postId={postId} />}
        {rootComments.slice(0, limit).map((comment: Comment) => (
          <CommentItem
            authorPost={authorPost}
            key={comment.id}
            comment={comment}
            replies={getReplies(comment.id)}
          />
        ))}

        {isFetching ? (
          <CircularProgress size={25} />
        ) : info.totalResults > limit ? (
          <Typography
            fontSize={10}
            sx={styles.textViewMore}
            onClick={() => setLimit((prev) => prev + 8)}
          >
            See more {numDesc(info.totalResults - info.limit)} comments
          </Typography>
        ) : null}

        {limit > 10 && <CommentForm postId={postId} />}
      </Box>
    </>
  );
};

const styles = {
  textViewMore: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};
