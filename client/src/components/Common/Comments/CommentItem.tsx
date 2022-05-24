import { useState } from 'react';
import { Box } from '@mui/material';
import { ActionButton } from './components/ActionButton';
import { AvatarComment } from './components/AvatarComment';
import { AuthorComment } from './components/AuthorComment';

import { ReplyCommentButton } from './components/ReplyCommentButton';
import { LikeCommentButton } from './components/LikeCommentButton';
import { Comment } from 'interface';
import { CommentForm } from './CommentForm';
import { Replies } from './Replies';
import { ContentComment } from './components/ContentComment';
import { useAuthContext } from 'hooks/useAppContext';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

type CommentItemProps = {
  comment: Comment;
  replies: Comment[] | [];
  authorPost: string;
};

export const CommentItem = ({ comment, replies, authorPost }: CommentItemProps) => {
  const { auth } = useAuthContext();
  const { text, author, createdAt, image, replyTo } = comment;
  const [toggleReplyForm, setToggleReplyForm] = useState(false);

  const isLiked = (auth && comment.likes.includes(auth.id)) || false;
  const replyId = comment.parentId ? comment.parentId : comment.id;

  const handleToggleForm = () => setToggleReplyForm(!toggleReplyForm);

  return (
    <>
      <Box mt="12px" mb="4px">
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* Avatar */}
          <AvatarComment avatar={author.profilePic.url} />
          <Box sx={{ ml: '4px' }}>
            {/* Content */}
            <Box sx={styles.contentContainer}>
              <AuthorComment isPostedBy={authorPost === author.id} author={author} />
              <ContentComment replyTo={replyTo} text={text} image={image?.url || ''} />
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', mt: '4px' }}>
              <LikeCommentButton commentId={comment.id} isLiked={isLiked} likes={comment.likes} />
              <ReplyCommentButton onClick={handleToggleForm} />
              <ActionButton>{dayjs(createdAt).fromNow()}</ActionButton>
            </Box>
          </Box>
        </Box>

        {/* Replies */}
        {replies.length > 0 && <Replies authorPost={authorPost} replies={replies} />}
        {/* Form */}
        {toggleReplyForm && (
          <Box sx={{ ml: 4 }}>
            <CommentForm
              replyTo={{ name: author.name, id: author.id }}
              postId={comment.post.id}
              parentId={replyId}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

const styles = {
  contentContainer: {
    bgcolor: '#3a3b3c',
    p: '4px 8px',
    borderRadius: 2,
    maxWidth: {
      lg: 480,
    },
  },
};
