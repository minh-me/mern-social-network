import { FC } from 'react';
import { Title } from 'components/App';
import { Box } from '@mui/material';
import { FormSearch } from 'components/Common/Forms';
import { Tab } from 'components/Common/Buttons/Tab';

type Props = {};

export const SearchPage: FC<Props> = (props) => {
  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Search" />
      </Box>

      <Box px={10} my={3} sx={{ maxWidth: '100%' }}>
        <FormSearch />
      </Box>

      <Box mx={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Tab text="Users" />
        <Tab text="Posts" active={true} />
      </Box>

      <Box sx={{ borderBottom: '1px solid #38444d' }} my={2} />
    </>
  );
};
