import { Box } from '@mui/material';
import { Title } from 'components/App';
import { CreatePostForm, PostList } from 'components/Common';
import { userFroms } from 'pages/search';
import { Post } from 'interface';
const user = userFroms[0];

export const posts: Post[] = [
  {
    id: '123',
    text: 'thứ 5, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    user,
    image: user.profilePic,
  },
  {
    id: '1234',
    text: 'thứ 523, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    image:
      'https://res.cloudinary.com/djvd6zhbg/image/upload/v1645065070/postImage/fik7evjfx3bg0a5tzweq.png',
    user,
  },
  {
    id: '1235',
    text: 'thứ 23, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    user,
  },
];

export const HomePage = () => {
  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Home" />
      </Box>

      <Box
        py={2}
        px={2}
        sx={{
          borderBottom: '8px solid #38444d',
          minHeight: 98,
          display: 'flex',
          alignItems: 'start',
        }}
      >
        <CreatePostForm />
      </Box>

      {/* PostList */}
      <PostList posts={posts} />
    </>
  );
};
