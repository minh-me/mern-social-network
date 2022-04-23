import { Box, IconButton } from '@mui/material';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import { pink } from '@mui/material/colors';
export const ProfilePic = () => {
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
      <img
        src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
        alt="Profile Pic"
      />
      <IconButton
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
    </Box>
  );
};
