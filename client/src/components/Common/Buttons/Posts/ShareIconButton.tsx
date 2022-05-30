import { PostActionButton } from '../PostActionButton';
import ShareIcon from '@mui/icons-material/Share';
import { pink } from '@mui/material/colors';
import { useDeleteRetweetPost, useRetweetPost } from 'RQhooks';
import { MDialog } from 'components/Common/Modal';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from 'hooks/useAppContext';

export const ShareIconButton = ({ shares = [''], postId = '' }) => {
  const { auth } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);

  const { mutateAsync: retweetPost } = useRetweetPost();
  const { mutateAsync: deleteRetweetPost } = useDeleteRetweetPost();

  const isRetweet = shares.includes(auth?.id as string);

  const handleRetweet = async (entityId: string) => {
    if (isRetweet) {
      await deleteRetweetPost(entityId);
      setOpenModal(false);

      return;
    }

    await retweetPost({ postId: entityId });
    setOpenModal(false);
  };

  return (
    <>
      <PostActionButton
        sx={{
          mx: 1,
          px: 1,
          color: isRetweet ? pink[400] : '#b0b3b8',
          '&:hover': {
            color: pink[400],
            bgcolor: 'rgba(153, 158, 163, 0.2)',
          },
        }}
        onClick={() => setOpenModal(true)}
        nums={shares.length || null}
        startIcon={<ShareIcon />}
      />

      <MDialog
        position="center"
        title="Share post?"
        onClose={() => setOpenModal(false)}
        entityId={postId}
        confirmButton={handleRetweet}
        open={openModal}
        textAlign="center"
      >
        <Typography component="span" sx={{ minWidth: 300, display: 'inline-block' }}>
          {isRetweet
            ? 'Hủy chia sẻ bài viết này?'
            : 'Chia sẻ bài viết này lên trên trang cá nhân của bạn?'}
        </Typography>
      </MDialog>
    </>
  );
};
