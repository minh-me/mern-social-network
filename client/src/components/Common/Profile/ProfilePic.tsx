import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import { pink } from '@mui/material/colors';

import { UploadProfilePicModal } from '../Modal';

export const ProfilePic = ({ profilePic = '' }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
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
      }}
    >
      <img src={profilePic} alt="Profile Pic" />
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: 'absolute',
          svg: {
            opacity: 0,
            visibility: 'hidden',
            color: pink[400],
            width: 20,
            height: 20,
            transition: 'all 0.2s ease-in-out',
          },
        }}
      >
        <PhotoCameraRoundedIcon fontSize="large" />
      </IconButton>

      <UploadProfilePicModal open={open} setOpen={setOpen} />
    </Box>
  );
};
