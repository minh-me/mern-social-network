import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';
import { ButtonSekeleton } from './ButtonSkeleton';
const bgColor = '#6c6c6c';

export const UserSkeleton = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }} py={2}>
      {/* Avatar */}
      <Skeleton sx={{ bgcolor: bgColor }} variant="circular" width={42} height={42} />

      <Box px={2} sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column', flex: 1 }}>
        <Skeleton width={80} height={24} sx={{ mr: '4px', bgcolor: bgColor }} variant="text" />
        <Skeleton width={80} height={18} sx={{ mr: '4px', bgcolor: bgColor }} variant="text" />
        <Skeleton width={80} height={15} sx={{ mr: '4px', bgcolor: bgColor }} variant="text" />
      </Box>

      <ButtonSekeleton />
    </Box>
  );
};

export const UserListSkeleton = () => (
  <>
    <UserSkeleton />
    <UserSkeleton />
  </>
);
