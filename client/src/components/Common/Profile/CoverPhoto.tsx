import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import pink from '@mui/material/colors/pink';
import { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { uploadAvatarSchema } from '~/validations';
import { useUploadCoverPhoto } from '~/RQhooks';
import { UploadFileModal } from '../Modal/UploadFileModal';

export const CoverPhoto = ({ coverPhoto = '' }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isLoading } = useUploadCoverPhoto();

  const onSubmit: SubmitHandler<{ file: FileList }> = async (data) => {
    const formData = new FormData();

    formData.append('coverPhoto', data.file[0]);

    await toast.promise(mutateAsync(formData), {
      pending: 'Upload...',
      success: 'Updated cover photo successfully!',
    });

    setOpen(false);
  };

  return (
    <Box sx={styles.container}>
      {coverPhoto && <img src={coverPhoto} alt={coverPhoto} />}
      <IconButton onClick={() => setOpen(true)} sx={styles.iconButton}>
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
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },

    '&:hover svg': {
      opacity: 1,
      visibility: 'visible',
    },
  },
  iconButton: {
    position: 'absolute',
    svg: {
      opacity: 0,
      visibility: 'hidden',
      color: pink[400],
      width: 40,
      height: 40,
      transition: 'all 0.3s ease-in-out',
    },
  },
};
