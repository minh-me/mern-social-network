import { Box } from '@mui/material';
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';
import { FollowButton, IconsButtonOutlined, Tab } from 'components/Common/Buttons';

type Props = {};

export const ProfileButtons = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} px={2} mt={2}>
      <IconsButtonOutlined>
        <LocalPostOfficeRoundedIcon fontSize="small" />
      </IconsButtonOutlined>
      <FollowButton isActive={true} />
    </Box>
  );
};
