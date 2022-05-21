import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';
import { ButtonSekeleton } from './ButtonSkeleton';
const bgColor = '#6c6c6c';

export const ProfilePhotoSkeleton = () => {
  return (
    <Box sx={{ height: '200px', position: 'relative' }}>
      <Skeleton sx={{ bgcolor: bgColor }} variant="rectangular" width="100%" height="100%" />
      <Box sx={{ position: 'absolute', bottom: '-40px', left: 16 }}>
        <Skeleton sx={{ bgcolor: bgColor }} variant="circular" width="80px" height="80px" />
      </Box>
    </Box>
  );
};

export const ProfileInfoSkeleton = () => {
  return (
    <Box mt={2} px={2}>
      <Skeleton width={120} height={44} sx={{ mr: '4px', bgcolor: bgColor }} variant="text" />
      <Skeleton width={100} height={18} sx={{ mr: '4px', bgcolor: bgColor }} variant="text" />

      <Box sx={{ display: 'flex' }}>
        <Skeleton width={100} height={20} sx={{ mr: '14px', bgcolor: bgColor }} variant="text" />
        <Skeleton width={100} height={20} sx={{ bgcolor: bgColor }} variant="text" />
      </Box>
    </Box>
  );
};

export const TabsSekeleton = () => {
  return (
    <Box mt={4} mx={3} sx={{ display: 'flex', alignItems: 'center' }}>
      <ButtonSekeleton fullWidth={true} />
      <ButtonSekeleton fullWidth={true} />
    </Box>
  );
};

export const ProfileHeaderSkeleton = () => {
  return (
    <Box mb={4}>
      <ProfilePhotoSkeleton />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} px={2} mt={2}>
        <ButtonSekeleton />
        <ButtonSekeleton />
      </Box>
      <ProfileInfoSkeleton />
      <TabsSekeleton />
    </Box>
  );
};
