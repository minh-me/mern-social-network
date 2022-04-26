import { useEffect } from 'react';
import { Title } from 'components/App';
import { Box, Button, CircularProgress } from '@mui/material';
import { Tab } from 'components/Common/Buttons/Tab';
import { PostList, UserList } from 'components/Common';
import { UserResponse } from 'interface';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormSearch } from './FormSearch';
import { useInfinitePosts } from 'RQhooks/post.rq';
import { useInfiniteUsers } from 'RQhooks';

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
  const queryKey = isSelectedPosts ? 'text' : 'name';
  const navigate = useNavigate();
  const queryValue = location.search.split('=')[1];

  const posts = useInfinitePosts({ enabled: isSelectedPosts });
  const users = useInfiniteUsers({ enabled: isSelectedPosts });

  console.log({ posts, users, isSelectedPosts });

  useEffect(() => {
    console.log({ queryValue });
  }, [queryValue]);

  return (
    <>
      {/* Title */}
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Search" />
      </Box>

      {/* Form search */}
      <Box px={10} my={3} sx={{ maxWidth: '100%' }}>
        <FormSearch queryKey={queryKey} />
      </Box>

      {/* Tab control */}
      <Box mx={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Tab
          onClick={() => {
            navigate('/search/users');
          }}
          text="Users"
          active={!isSelectedPosts}
        />
        <Tab
          onClick={() => {
            navigate('/search/posts');
          }}
          text="Posts"
          active={isSelectedPosts}
        />
      </Box>
      <Box sx={{ borderBottom: '1px solid #38444d' }} my={2} mt={4} />

      {/* result users */}
      {!isSelectedPosts && (
        <>
          {users.data?.pages && <UserList data={users.data} />}

          {users.isFetching && !users.isFetchingNextPage ? 'Fetching...' : null}

          <Box mt={2} mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            {users.isFetchingNextPage ? (
              <CircularProgress size={25} />
            ) : users.hasNextPage ? (
              <Button onClick={() => users.fetchNextPage()}>Load more</Button>
            ) : null}
          </Box>
        </>
      )}

      {/* result posts */}
      {isSelectedPosts && (
        <>
          {posts.data?.pages && <PostList data={posts.data} />}

          {posts.isFetching && !posts.isFetchingNextPage ? 'Fetching...' : null}

          <Box mt={2} mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            {posts.isFetchingNextPage ? (
              <CircularProgress size={25} />
            ) : posts.hasNextPage ? (
              <Button onClick={() => posts.fetchNextPage()}>Load more</Button>
            ) : null}
          </Box>
        </>
      )}
    </>
  );
};
