import { Box, Typography } from '@mui/material';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import { memo, useState } from 'react';
import { Comment } from 'interface';

type Props = {
  postId: string;
  comments: Comment[] | [];
};

export const CommentList = memo(({ comments, postId }: Props) => {
  const [limit, setLimit] = useState(8);

  const rootComments = comments.filter((comm) => !comm.reply);
  const getReplies = (commentId: string) =>
    comments.filter((comm) => comm.reply === commentId) || [];

  const numComments = rootComments.length;
  const numDesc = (num: number) => (num === 1 ? ' comment' : `${num} comments`);

  return (
    <>
      <Box my={2}>
        <CommentForm entryId={postId} />

        {rootComments.slice(0, limit).map((comment) => (
          <CommentItem key={comment.id} comment={comment} replies={getReplies(comment.id)} />
        ))}

        {numComments > limit && (
          <Typography
            fontSize={10}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => setLimit((prev) => prev + 8)}
          >
            See more {numDesc(numComments > limit ? numComments - limit : limit - numComments)}{' '}
            comments
          </Typography>
        )}
      </Box>
    </>
  );
});
