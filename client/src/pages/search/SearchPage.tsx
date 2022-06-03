import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { Title } from '~/components/App';
import { Tab } from '~/components/Common/Buttons/Tab';

import { FormSearch } from './FormSearch';
import { TabPostList } from './Tab_PostList';
import { TabUserList } from './Tab_UserList';

export const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedTab = location.pathname.split('/').slice(-1)[0] as 'posts' | 'users';

  const isSelectedPosts = selectedTab === 'posts';

  const { search } = location;

  return (
    <>
      {/* Title */}
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Search" />
      </Box>

      {/* Form search */}
      <Box px={10} my={3} sx={{ maxWidth: '100%' }}>
        <FormSearch name="search" />
      </Box>

      {/* Tab control */}
      <Box mx={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Tab onClick={() => navigate('/search/users')} text="Users" active={!isSelectedPosts} />
        <Tab onClick={() => navigate('/search/posts')} text="Posts" active={isSelectedPosts} />
      </Box>
      <Box sx={{ borderBottom: '1px solid #38444d' }} my={2} mt={4} />

      {/* result users */}
      {!isSelectedPosts && <TabUserList search={search} />}

      {/* result posts */}
      {isSelectedPosts && <TabPostList search={search} />}
    </>
  );
};
