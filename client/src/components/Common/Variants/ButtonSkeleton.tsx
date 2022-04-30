import { Skeleton } from '@mui/material';
const bgColor = '#6c6c6c';

export const ButtonSekeleton = ({ fullWidth = false }) => {
  return (
    <Skeleton
      width={fullWidth ? '100%' : 68}
      height={38}
      sx={{ mr: '4px', bgcolor: bgColor, borderRadius: 8 }}
      variant="rectangular"
    />
  );
};
