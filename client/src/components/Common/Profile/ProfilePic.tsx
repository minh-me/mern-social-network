import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import pink from '@mui/material/colors/pink';
import { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { uploadAvatarSchema } from '~/validations';
import { useUploadProfilePic } from '~/RQhooks';
import { UploadFileModal } from '../Modal/UploadFileModal';

export const ProfilePic = ({ profilePic = '' }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isLoading } = useUploadProfilePic();

  const onSubmit: SubmitHandler<{ file: FileList }> = async (data) => {
    const formData = new FormData();

    formData.append('avatar', data.file[0]);

    await toast.promise(mutateAsync(formData), {
      pending: 'Upload...',
      success: 'Updated profile picture successfully!',
    });

    setOpen(false);
  };

  return (
    <Box sx={styles.container}>
      <img src={profilePic} alt="Profile Pic" />
      <IconButton onClick={() => setOpen(true)} sx={styles.photoIcon}>
        <PhotoCameraRoundedIcon fontSize="large" />
      </IconButton>

      <UploadFileModal
        open={open}
        onClose={() => setOpen(false)}
        resolver={yupResolver(uploadAvatarSchema)}
        onSubmit={onSubmit}
        title="Change Avatar"
        isLoading={isLoading}
      />
    </Box>
  );
};

const styles = {
  container: {
    width: '80px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid white',
    borderRadius: '50%',
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
    },

    '&:hover svg': {
      opacity: 1,
      visibility: 'visible',
    },
  },

  photoIcon: {
    position: 'absolute',
    svg: {
      opacity: 0,
      visibility: 'hidden',
      color: pink[400],
      width: 20,
      height: 20,
      transition: 'all 0.2s ease-in-out',
    },
  },
};
