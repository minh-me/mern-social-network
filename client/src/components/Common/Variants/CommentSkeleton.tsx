import { Box, Skeleton } from '@mui/material';
const bgColor = '#6c6c6c';

export const CommentSkeleton = () => {
  return (
    <Box mt="12px" mb="4px">
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <Skeleton sx={{ bgcolor: bgColor }} variant="circular" width={26} height={26} />
        <Box sx={{ ml: 1 }}>
          {/* Content */}
          <Box
            sx={{ bgcolor: '#3a3b3c', p: '4px 8px', borderRadius: 2, mr: 3, maxWidth: { lg: 480 } }}
          >
            <Skeleton width={80} sx={{ mr: '4px', bgcolor: bgColor }} variant="text" />
            <Skeleton width={120} sx={{ mr: '4px', bgcolor: bgColor }} variant="text" />
          </Box>
          <Skeleton height={16} width={140} sx={{ mr: '4px', bgcolor: bgColor }} variant="text" />
        </Box>
      </Box>
    </Box>
  );
};

export const CommentsSkeleton = () => (
  <>
    <CommentSkeleton /> <CommentSkeleton /> <CommentSkeleton />
  </>
);
