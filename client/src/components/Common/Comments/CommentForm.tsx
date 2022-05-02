import { Box, FormControl, InputAdornment, InputBase, IconButton, Avatar } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import styled from '@emotion/styled';
import { useAppContext } from 'hooks/useAppContext';
import React, { useRef } from 'react';
import { useCreateComment, useCreateReplyComment } from 'RQhooks';

export const CommentForm = ({ entryId = '', isReply = false }) => {
  const {
    state: { auth },
  } = useAppContext();
  const inputRef = useRef<HTMLInputElement>();

  const { mutateAsync: comment } = useCreateComment();
  const { mutateAsync: reply } = useCreateReplyComment(entryId);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current?.value) {
      if (isReply) {
        await reply({ text: inputRef.current?.value });
        inputRef.current.value = '';
        return;
      }

      await comment({ text: inputRef.current?.value, post: entryId });
      inputRef.current.value = '';
    }
  };

  return (
    <Box my={2} sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        sx={{ border: '1px solid white', height: 26, width: 26, mr: '4px' }}
        alt={auth?.user.name}
        src={auth?.user.profilePic.url}
      />

      <FormControl
        sx={{ border: '1px solid #38444d', borderRadius: 25, width: '100%' }}
        variant="standard"
      >
        <Input
          inputRef={inputRef}
          fullWidth
          placeholder="Enter comment.."
          onKeyDown={handleKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <IconButton sx={styles.icons}>
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
              <IconButton sx={{ ...styles.icons, mr: 1 }}>
                <PhotoCameraOutlinedIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

const Input = styled(InputBase)(() => ({
  fontSize: 16,
  '& .MuiInputBase-input': {
    borderRadius: 50,
    position: 'relative',
    padding: '4px 14px 4px 14px',
    fontSize: 13,
    color: '#f21980',
    '&::-webkit-input-placeholder': {
      color: 'white',
    },
  },
}));

const styles = {
  icons: {
    color: '#898b8e',
    cursor: 'pointer',
    transition: 'all 0.3s',
    p: '4px',
    '&:hover': {
      bgcolor: '#3a3b3c',
    },
    svg: {
      height: 18,
      width: 18,
    },
  },
};
