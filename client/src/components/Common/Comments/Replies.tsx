import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { CommentItem } from './CommentItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import { Comment } from 'interface';

type Props = {
  replies: Comment[];
};

export const Replies = ({ replies }: Props) => {
  const [limit, setLimit] = useState(8);
  const [toggleReplies, setToggleRelies] = useState(false);

  const numReplies = replies.length;
  const numDesc = (num: number) => (num === 1 ? ' reply' : `${num} replies`);
  const handleToggleReplies = () => {
    setToggleRelies(!toggleReplies);
  };
  return (
    <>
      <Box ml={4}>
        <Typography
          fontSize={10}
          component="span"
          color="#3a97e7"
          onClick={handleToggleReplies}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {toggleReplies ? (
            <>
              <ArrowDropUp />
              Hide
            </>
          ) : (
            <>
              <ArrowDropDownIcon /> View
            </>
          )}{' '}
          {numDesc(numReplies)}
        </Typography>

        {toggleReplies &&
          replies
            .slice(0, limit)
            .map((reply) => <CommentItem key={reply.id} comment={reply} replies={[]} />)}

        {numReplies > limit && (
          <Typography
            fontSize={9}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() =>
              setLimit((prev) => {
                if (prev < numReplies) return prev + 8;
                return prev;
              })
            }
          >
            See more {numDesc(numReplies > limit ? numReplies - limit : limit - numReplies)}
          </Typography>
        )}
      </Box>
    </>
  );
};
