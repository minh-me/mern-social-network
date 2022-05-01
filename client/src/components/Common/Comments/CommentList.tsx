import { Box, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import { memo } from 'react';
import { useCommentsByPost } from 'RQhooks';

type Props = {
  postId: string;
};

export const CommentList = memo(({ postId }: Props) => {
  const { data } = useCommentsByPost({ postId });
  console.log({ data });
  return (
    <>
      <Box my={2}>
        <CommentForm />

        <Box>
          {/* Comment */}
          <CommentItem />
          <Typography
            fontSize={10}
            color="#3a97e7"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <ArrowDropDownIcon />
            View 3 replies
          </Typography>
          {/* Replies */}
          <Box ml={4}>
            <CommentItem />
          </Box>
        </Box>

        <Box>
          {/* Comment */}
          <CommentItem />
          {/* Replies */}
          <Box ml={4}>
            <CommentItem />
            <CommentItem />
            <CommentItem />
          </Box>
        </Box>

        <Box>
          {/* Comment */}
          <CommentItem />

          <Typography
            fontSize={10}
            color="#3a97e7"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <ArrowDropUp />
            Hide 3 replies
          </Typography>

          {/* Replies */}
          <Box ml={4}>
            <CommentItem />
          </Box>
        </Box>

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
        >
          See more 24 comments
        </Typography>
      </Box>
    </>
  );
});
