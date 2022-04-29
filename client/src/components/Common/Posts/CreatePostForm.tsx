import { Avatar, Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { CreatePostFormModal } from 'components/Common/Modal';
import { User } from 'interface';

const userFrom: User = {
  profilePic:
    'https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png',
  name: 'minh',
  email: 'minhch.vn@gmail.com',
  role: 'admin',
  createdAt: '2022-03-08T14:12:58.562Z',
  updatedAt: '2022-03-08T14:25:39.750Z',
  id: '6227646a0588488cd53eb293',
};

type Props = {};

export const CreatePostForm = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <Avatar alt={userFrom.name} src={userFrom.profilePic} sx={styles.avatar} />
        <TextField
          variant="standard"
          fullWidth
          value={''}
          onClick={handleClickOpen}
          placeholder="What's happending?"
          sx={styles.textField}
          InputProps={{ disableUnderline: true }}
        />
        <Button sx={styles.button} disabled={true} variant="contained">
          Post
        </Button>

        <CreatePostFormModal open={open} setOpen={setOpen} user={userFrom} />
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
