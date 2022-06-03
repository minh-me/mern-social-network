import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';

import { Comment } from '~/interface';
import { CommentItem } from './CommentItem';

type Props = {
  replies: Comment[];
  authorPost: string;
};

export const Replies = ({ replies, authorPost }: Props) => {
  const [limit, setLimit] = useState(6);
  const [openReplies, setOpenRelies] = useState(false);

  const numReplies = replies.length;

  const numDesc = (num: number) => (num === 1 ? ' reply' : `${num} replies`);

  const handleOpenReplies = () => setOpenRelies(!openReplies);

  return (
    <>
      <Box ml={4}>
        <Typography component="span" onClick={handleOpenReplies} sx={styles.textToggleView}>
          {openReplies ? (
            <>
              <ArrowDropUp /> Hide
            </>
          ) : (
            <>
              <ArrowDropDownIcon /> View
            </>
          )}{' '}
          {numDesc(numReplies)}
        </Typography>

        {openReplies &&
          replies
            .slice(0, limit)
            .map((reply) => (
              <CommentItem authorPost={authorPost} key={reply.id} comment={reply} replies={[]} />
            ))}

        {numReplies > limit && (
          <Typography
            sx={styles.textViewMore}
            onClick={() =>
              setLimit((prev) => {
                if (prev < numReplies) return prev + 6;
                return prev;
              })
            }
          >
            See more replies
          </Typography>
        )}
      </Box>
    </>
  );
};

const styles = {
  textToggleView: {
    color: '#3a97e7',
    display: 'inline-flex',
    fontSize: 10,
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': { textDecoration: 'underline' },
  },
  textViewMore: {
    fontSize: 9,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};
