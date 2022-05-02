import { useState } from 'react';
import { Box } from '@mui/material';
import { CommentActionButton } from './components/CommentActionButton';
import { ReplyCommentButton } from './components/ReplyCommentButton';
import { LikeCommentButton } from './components/LikeCommentButton';
import { CommentAvatar } from './components/CommentAvatar';
import { CommentName } from './components/CommentName';
import { CommentText } from './components/CommentText';
import { Comment } from 'interface';
import { CommentForm } from './CommentForm';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Replies } from './Replies';
dayjs.extend(relativeTime);

type CommentItemProps = {
  comment: Comment;
  replies: Comment[] | [];
};

export const CommentItem = ({ comment, replies }: CommentItemProps) => {
  const [toggleReplyForm, setReplyToggle] = useState(false);
  const { text, user, createdAt } = comment;

  const handleToggleForm = () => setReplyToggle(!toggleReplyForm);
  return (
    <>
      <Box mt="12px" mb="4px">
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <CommentAvatar avatar={user.profilePic.url} />
          <Box>
            <Box sx={{ bgcolor: '#3a3b3c', p: '4px 8px', borderRadius: 2 }}>
              <CommentName name={user.name} username={user.username} />
              <CommentText text={text} />
            </Box>

            <Box sx={{ display: 'flex', mt: '4px' }}>
              <LikeCommentButton />
              <ReplyCommentButton onClick={handleToggleForm} />
              <CommentActionButton>{dayjs(createdAt).fromNow()}</CommentActionButton>
            </Box>
          </Box>
        </Box>

        {toggleReplyForm && <CommentForm isReply={true} entryId={comment.id} />}
      </Box>
      {replies.length > 0 && <Replies replies={replies} />}
    </>
  );
};
