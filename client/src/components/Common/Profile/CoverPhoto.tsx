import { Box, IconButton } from '@mui/material';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import { pink } from '@mui/material/colors';
export const CoverPhoto = () => {
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
      <img
        src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1647778887/coverPhoto/c5dprvz61m6tx8rjxacl.png"
        alt="Cover photo"
      />
      <IconButton
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
    </Box>
  );
};
