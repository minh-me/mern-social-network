import { Box } from '@mui/material';
import { CoverPhoto, ProfilePic } from 'components/Common';

type Props = {};

export const ProfileHeader = (props: Props) => {
  return (
    <Box sx={{ height: '200px', position: 'relative' }}>
      <CoverPhoto />
      <Box sx={{ position: 'absolute', bottom: '-40px', left: 16 }}>
        <ProfilePic />
      </Box>
    </Box>
  );
};
