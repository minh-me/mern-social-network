import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const Activate = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  console.log({ token });
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '300',
        letterSpacing: '2px',
      }}
    >
      <ToastContainer />
      <Typography fontSize={15} color="#fbc02d" sx={{ textTransform: 'capitalize' }}>
        ready to login ? 👉🏻
        <Typography
          component="span"
          onClick={handleClick}
          color="#f96a8b"
          sx={{ p: 2, cursor: 'pointer' }}
        >
          Here
        </Typography>
      </Typography>
    </Box>
  );
};
