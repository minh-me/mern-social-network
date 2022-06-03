import { useState } from 'react';
import { Avatar, Box, Button, TextField } from '@mui/material';

import { CreatePostFormModal } from '~/components/Common/Modal';
import { useAuthContext } from '~/hooks/useAppContext';

export const CreatePostForm = () => {
  const { auth } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Box
        py={2}
        px={2}
        sx={{
          borderBottom: '8px solid #38444d',
          minHeight: 98,
          display: 'flex',
          alignItems: 'start',
        }}
      >
        <Avatar alt={auth?.username} src={auth?.profilePic.url} sx={styles.avatar} />
        <TextField
          variant="standard"
          fullWidth
          value={''}
          onClick={handleClickOpen}
          placeholder="What's happending?"
          sx={styles.textField}
          InputProps={{ disableUnderline: true }}
          disabled={!auth?.username}
        />
        <Button sx={styles.button} disabled={true} variant="contained">
          Post
        </Button>

        <CreatePostFormModal open={open} setOpen={setOpen} />
      </Box>
    </>
  );
};

const styles = {
  avatar: { border: '2px solid white' },
  textField: { input: { color: 'white', py: 1, ml: 2, fontSize: 18, pb: 4 } },
  button: {
    alignSelf: 'flex-end',
    textTransform: 'capitalize',
    borderRadius: 5,
    bgcolor: '#b5496b',
    '&:disabled': {
      bgcolor: '#b5496b',
      color: 'white',
    },
  },
};
