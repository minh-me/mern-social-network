import { useRef } from 'react';
import { Title } from 'components/App';
import { Box, Button, CircularProgress } from '@mui/material';
import { Tab } from 'components/Common/Buttons/Tab';
import { PostList, UserList } from 'components/Common';
import { UserResponse } from 'interface';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormSearch } from './FormSearch';
import { useInfinitePosts } from 'RQhooks/post.rq';
import { useInfiniteUsers } from 'RQhooks';

import { Tab_PostList } from './Tab_PostList';
import { Tab_UserList } from './Tab_UserList';

export const userFroms: UserResponse[] = [
  {
    profilePic:
      'https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png',
    name: 'Minh Chìu',
    email: 'minhch.vn@gmail.com',
    role: 'admin',
    createdAt: '2022-03-08T14:12:58.562Z',
    updatedAt: '2022-03-08T14:25:39.750Z',
    id: '6227646a0588488cd53eb293',
  },
  {
    profilePic:
      'https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png',
    name: 'Minh Chìu',
    email: 'minhch.vn@gmail.com',
    role: 'admin',
    createdAt: '2022-03-08T14:12:58.562Z',
    updatedAt: '2022-03-08T14:25:39.750Z',
    id: '12123123',
  },
  {
    profilePic:
      'https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png',
    name: 'Minh Chìu',
    email: 'minhch.vn@gmail.com',
    role: 'admin',
    createdAt: '2022-03-08T14:12:58.562Z',
    updatedAt: '2022-03-08T14:25:39.750Z',
    id: '62271fw23646a0588488cd53eb293',
  },
];

export type SearchProps = {
  text: string;
};
export const SearchPage = () => {
  const location = useLocation();
  const selectedTab = location.pathname.split('/').slice(-1)[0] as 'posts' | 'users';
  const isSelectedPosts = selectedTab === 'posts';
  const navigate = useNavigate();
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
      {!isSelectedPosts && <Tab_UserList search={search} />}

      {/* result posts */}
      {isSelectedPosts && <Tab_PostList search={search} />}
    </>
  );
};
