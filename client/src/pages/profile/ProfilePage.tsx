import { FC } from 'react';
import { Title } from 'components/App';
import { Box } from '@mui/material';

type Props = {};

export const ProfilePage: FC<Props> = (props) => {
  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Profile" />
      </Box>
    </>
  );
};
