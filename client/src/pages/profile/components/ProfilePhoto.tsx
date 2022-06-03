import { Box } from '@mui/material';
import { CoverPhoto, ProfilePic } from '~/components/Common';

type Props = {
  profilePic: string;
  coverPhoto?: string;
};

export const ProfilePhoto = ({ profilePic, coverPhoto }: Props) => {
  return (
    <Box sx={{ height: '200px', position: 'relative', bgcolor: '#393348' }}>
      <CoverPhoto coverPhoto={coverPhoto} />
      <Box sx={{ position: 'absolute', bottom: '-40px', left: 16 }}>
        <ProfilePic profilePic={profilePic} />
      </Box>
    </Box>
  );
};
