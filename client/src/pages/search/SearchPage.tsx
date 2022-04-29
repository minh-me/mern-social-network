import { useRef } from 'react';
import { Title } from 'components/App';
import { Box } from '@mui/material';
import { Tab } from 'components/Common/Buttons/Tab';

import { useNavigate, useLocation } from 'react-router-dom';
import { FormSearch } from './FormSearch';
import { Tab_PostList } from './Tab_PostList';
import { Tab_UserList } from './Tab_UserList';

export const SearchPage = () => {
  const location = useLocation();
  const selectedTab = location.pathname.split('/').slice(-1)[0] as 'posts' | 'users';
  const isSelectedPosts = selectedTab === 'posts';
  const navigate = useNavigate();
  const { search } = location;
  const ref = useRef(0);

  return (
    <>
      {/* Title */}
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Search" />
        {ref.current++}
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
      {!isSelectedPosts && <Tab_UserList search={search} />}

      {/* result posts */}
      {isSelectedPosts && <Tab_PostList search={search} />}
    </>
  );
};
