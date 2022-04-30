import { Box, IconButton } from '@mui/material';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import { pink } from '@mui/material/colors';
import { UploadCoverPhotoModal } from '../Modal';
import { useState } from 'react';

export const CoverPhoto = ({ coverPhoto = '' }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
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
      }}
    >
      {coverPhoto && <img src={coverPhoto} alt={coverPhoto} />}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: 'absolute',
          svg: {
            opacity: 0,
            visibility: 'hidden',
            color: pink[400],
            width: 50,
            height: 50,
            transition: 'all 0.3s ease-in-out',
          },
        }}
      >
        <PhotoCameraRoundedIcon fontSize="large" />
      </IconButton>

      <UploadCoverPhotoModal open={open} setOpen={setOpen} />
    </Box>
  );
};
