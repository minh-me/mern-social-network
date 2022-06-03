import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useActiveAccount } from '~/RQhooks';

export const Activate = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { mutateAsync } = useActiveAccount();

  useEffect(() => {
    const activeAccount = async () => {
      try {
        await mutateAsync(token as string);
      } catch (error) {
        navigate('/auth/register');
      }
    };

    if (token) activeAccount();
  }, [token, navigate, mutateAsync]);

  const handleClick = () => {
    navigate('/auth');
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
