import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';
const bgColor = '#6c6c6c';

export const MessageHeaderSkeleton = () => {
  return (
    <Box px={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }} py={2}>
        {/* Avatar */}
        <Skeleton sx={{ bgcolor: bgColor }} variant="circular" width={40} height={40} />

        <Skeleton width={70} height={32} sx={{ ml: 1, bgcolor: bgColor }} variant="text" />

        <Box px={2} sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Skeleton variant="text" width={32} height={28} sx={{ ml: 1, bgcolor: bgColor }} />
          <Skeleton variant="text" width={32} height={28} sx={{ ml: 1, bgcolor: bgColor }} />
          <Skeleton variant="text" width={32} height={28} sx={{ ml: 1, bgcolor: bgColor }} />
        </Box>
      </Box>
    </Box>
  );
};
