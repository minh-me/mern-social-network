import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';
const bgColor = '#6c6c6c';

export const PostFormSkeleton = () => {
  return (
    <Box
      px={2}
      pt={3}
      pb={2}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: '100%',
        borderBottom: '1px solid #38444d',
      }}
    >
      {/* Avatar */}
      <Skeleton sx={{ bgcolor: bgColor }} variant="circular" width={50} height={40} />

      <Box px={2} sx={{ width: '100%' }}>
        <Skeleton sx={{ bgcolor: bgColor }} variant="rectangular" width={'100%'} height={118} />

        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            maxWidth: '100%',
          }}
        >
          <Skeleton
            width={60}
            height={30}
            sx={{ mr: '4px', bgcolor: bgColor, borderRadius: 8 }}
            variant="rectangular"
          />
        </Box>
      </Box>
    </Box>
  );
};

export const PostSkeleton = () => {
  return (
    <Box
      px={2}
      pt={3}
      pb={2}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: '100%',
        borderBottom: '1px solid #38444d',
      }}
    >
      {/* Avatar */}
      <Skeleton sx={{ bgcolor: bgColor }} variant="circular" width={50} height={40} />

      {/* User info */}
      <Box px={2} sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            maxWidth: '100%',
            borderBottom: '1px solid #38444d',
          }}
        >
          <Skeleton width={80} sx={{ mr: '4px', bgcolor: bgColor }} variant="text" />
          <Skeleton width={80} sx={{ mx: '4px', bgcolor: bgColor }} variant="text" />
          <Skeleton width={80} sx={{ mx: '4px', bgcolor: bgColor }} variant="text" />
        </Box>

        <Skeleton width={150} sx={{ bgcolor: bgColor }} variant="text" />
        {/* Post Content */}
        <Skeleton sx={{ bgcolor: bgColor }} variant="rectangular" width={'100%'} height={118} />

        {/* post footer */}
        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            maxWidth: '100%',
          }}
        >
          <Skeleton
            width={80}
            sx={{ mr: '4px', bgcolor: bgColor, borderRadius: 8 }}
            variant="rectangular"
          />
          <Skeleton
            width={80}
            sx={{ mx: '4px', bgcolor: bgColor, borderRadius: 8 }}
            variant="rectangular"
          />
          <Skeleton
            width={80}
            sx={{ mx: '4px', bgcolor: bgColor, borderRadius: 8 }}
            variant="rectangular"
          />
        </Box>
      </Box>
    </Box>
  );
};

export const PostTextSkeleton = () => {
  return (
    <Box
      px={2}
      pt={3}
      pb={2}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: '100%',
        borderBottom: '1px solid #38444d',
      }}
    >
      {/* Avatar */}
      <Skeleton sx={{ bgcolor: bgColor }} variant="circular" width={50} height={40} />

      {/* User info */}
      <Box px={2} sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            maxWidth: '100%',
            borderBottom: '1px solid #38444d',
          }}
        >
          <Skeleton width={80} sx={{ mr: '4px', bgcolor: bgColor }} variant="text" />
          <Skeleton width={80} sx={{ mx: '4px', bgcolor: bgColor }} variant="text" />
          <Skeleton width={80} sx={{ mx: '4px', bgcolor: bgColor }} variant="text" />
        </Box>

        <Skeleton width={'100%'} height={80} sx={{ bgcolor: bgColor }} />

        {/* post footer */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            maxWidth: '100%',
          }}
        >
          <Skeleton
            width={80}
            sx={{ mr: '4px', bgcolor: bgColor, borderRadius: 8 }}
            variant="rectangular"
          />
          <Skeleton
            width={80}
            sx={{ mx: '4px', bgcolor: bgColor, borderRadius: 8 }}
            variant="rectangular"
          />
          <Skeleton
            width={80}
            sx={{ mx: '4px', bgcolor: bgColor, borderRadius: 8 }}
            variant="rectangular"
          />
        </Box>
      </Box>
    </Box>
  );
};

export const PostImageSkeleton = () => {
  return (
    <Box
      px={2}
      pt={3}
      pb={2}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: '100%',
        borderBottom: '1px solid #38444d',
      }}
    >
      {/* Avatar */}
      <Skeleton sx={{ bgcolor: bgColor }} variant="circular" width={50} height={40} />

      {/* User info */}
      <Box px={2} sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            maxWidth: '100%',
            borderBottom: '1px solid #38444d',
          }}
        >
          <Skeleton width={80} sx={{ mr: '4px', bgcolor: bgColor }} variant="text" />
          <Skeleton width={80} sx={{ mx: '4px', bgcolor: bgColor }} variant="text" />
          <Skeleton width={80} sx={{ mx: '4px', bgcolor: bgColor }} variant="text" />
        </Box>

        {/* Post Content */}
        <Skeleton sx={{ bgcolor: bgColor }} variant="rectangular" width={'100%'} height={118} />

        {/* post footer */}
        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            maxWidth: '100%',
          }}
        >
          <Skeleton
            width={80}
            sx={{ mr: '4px', bgcolor: bgColor, borderRadius: 8 }}
            variant="rectangular"
          />
          <Skeleton
            width={80}
            sx={{ mx: '4px', bgcolor: bgColor, borderRadius: 8 }}
            variant="rectangular"
          />
          <Skeleton
            width={80}
            sx={{ mx: '4px', bgcolor: bgColor, borderRadius: 8 }}
            variant="rectangular"
          />
        </Box>
      </Box>
    </Box>
  );
};

export const PostListSkeleton = () => {
  return (
    <>
      <PostSkeleton />
      <PostTextSkeleton />
    </>
  );
};

export const HomeSkeleton = () => {
  return (
    <>
      <PostFormSkeleton />
      <PostListSkeleton />
    </>
  );
};
