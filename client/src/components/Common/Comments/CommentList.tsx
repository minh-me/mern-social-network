import { Box, Button, Typography } from '@mui/material';
import { CommentItem } from './CommentItem';
import { useRef, useState } from 'react';
import { CommentForm } from './CommentForm';
import { useCommentsByPost } from 'RQhooks';
import { CommentSkeleton, CommentsSkeleton } from '../Variants/CommentSkeleton';

type Props = {
  postId: string;
  authorPost: string;
};

export const CommentList = ({ postId, authorPost }: Props) => {
  const [limit, setLimit] = useState(8);
  const countRef = useRef(0);

  const { data, isLoading, isFetching } = useCommentsByPost({ postId, limit });

  if (isLoading || !data) return <CommentsSkeleton />;

  const { comments, info } = data;

  const rootComments = comments.filter((comm) => !comm.parentId);

  const getReplies = (commentId: string) =>
    comments.filter((comm) => comm.parentId === commentId) || [];

  const numDesc = (num: number) => (num === 1 ? ' comment' : `${num} comments`);

  return (
    <>
      <Box my={2}>
        {countRef.current++}
        {limit <= 10 && <CommentForm postId={postId} />}
        {rootComments.slice(0, limit).map((comment) => (
          <CommentItem
            authorPost={authorPost}
            key={comment.id}
            comment={comment}
            replies={getReplies(comment.id)}
          />
        ))}

        {isFetching && (
          <Button sx={{ textTransform: 'capitalize', fontSize: '12px' }}>Loading More...</Button>
        )}

        {!isFetching && info.totalResults > info.limit && (
          <Typography
            fontSize={10}
            sx={styles.textViewMore}
            onClick={() => setLimit((prev) => prev + 8)}
          >
            See more {numDesc(info.totalResults - info.limit)} comments
          </Typography>
        )}

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
