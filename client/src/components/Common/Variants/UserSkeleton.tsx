import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
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
      <Skeleton
        width={68}
        height={38}
        sx={{ mr: '4px', bgcolor: bgColor, borderRadius: 8 }}
        variant="rectangular"
      />
    </Box>
  );
};

export const UserListSkeleton = () => (
  <>
    <UserSkeleton /> <UserSkeleton />
  </>
);
