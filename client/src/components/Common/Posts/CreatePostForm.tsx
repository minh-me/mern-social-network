import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import { CreatePostFormModal } from 'components/Common/Modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInputText, FormInputDate } from 'components/Common';
import * as yup from 'yup';
const userFrom = {
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

export const registerSchema = yup.object({
  name: yup.string().required().label('Name'),
});

const defaultValues = {
  name: '',
};
export const CreatePostForm = (props: Props) => {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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

      <CreatePostFormModal title="Create Post" open={open} onClose={handleClose}>
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Avatar alt={userFrom.name} src={userFrom.profilePic} sx={styles.avatar} />
          <Box px={1}>
            <Typography color="#f91880" fontWeight={700} fontSize={16} component="p">
              Minh Chiu
            </Typography>
            <Typography fontSize={13} color="#999ea3" component="span">
              @{userFrom.name}.mchiu
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <textarea
            placeholder="What's happending?"
            style={{
              color: 'white',
              minHeight: '64px',
              fontSize: 16,
              marginTop: 16,
              outline: 'none',
              border: 0,
              backgroundColor: 'transparent',
              width: '100%',
              flex: 1,
              paddingLeft: 12,
            }}
          />

          <label htmlFor="image" style={{ alignSelf: 'flex-end' }}>
            <input style={{ display: 'none' }} id="image" type="file" />
            <IconButton component="span" sx={{ color: 'white', p: 0 }}>
              <ImageIcon />
            </IconButton>
          </label>
        </Box>

        <Box sx={{ textAlign: 'center', display: 'none' }}>
          <img src={userFrom.profilePic} />
        </Box>
      </CreatePostFormModal>
    </>
  );
};

const styles = {
  titleContainer: { borderBottom: '1px solid #38444d' },
  postFormContainer: {
    borderBottom: '8px solid #38444d',
    minHeight: 98,
  },
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
