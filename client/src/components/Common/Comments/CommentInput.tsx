import { Box, FormControl, InputAdornment, InputBase, IconButton, Avatar } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import styled from '@emotion/styled';

export const CommentInput = () => {
  return (
    <Box my={2} sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        sx={{ border: '1px solid white', height: 26, width: 26, mr: '4px' }}
        alt="Remy Sharp"
        src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
      />

      <FormControl
        sx={{ border: '1px solid #38444d', borderRadius: 25, width: '100%' }}
        variant="standard"
      >
        <Input
          fullWidth
          placeholder="Enter comment.."
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                sx={{
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
                }}
              >
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#898b8e',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  p: '4px',
                  mr: 1,
                  '&:hover': {
                    bgcolor: '#3a3b3c',
                  },
                  svg: {
                    height: 18,
                    width: 18,
                  },
                }}
              >
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
