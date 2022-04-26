import { Box, Button, CircularProgress } from '@mui/material';
import { Title } from 'components/App';
import { CreatePostForm, PostList } from 'components/Common';
import {
  PostSkeleton,
  PostTextSkeleton,
  PostImageSkeleton,
  PostFormSkeleton,
} from 'components/Common/Variants';
import { userFroms } from 'pages/search';
import { Post } from 'interface';
import { useInfinitePosts } from 'RQhooks/post.rq';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const user = userFroms[0];

export const posts: Post[] = [
  {
    id: '123',
    text: 'thứ 5, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    postedBy: user,
    // image: user.profilePic,
  },
  {
    id: '1234',
    text: 'thứ 523, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    // image:
    //   'https://res.cloudinary.com/djvd6zhbg/image/upload/v1645065070/postImage/fik7evjfx3bg0a5tzweq.png',
    postedBy: user,
  },
  {
    id: '1235',
    text: 'thứ 23, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    postedBy: user,
  },
];

export const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfinitePosts();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

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
      {data?.pages && <PostList data={data} />}
      <div>
        {isFetching && !isFetchingNextPage ? (
          <>
            <PostSkeleton />
            <PostTextSkeleton />
            <PostImageSkeleton />
          </>
        ) : null}
      </div>
      <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
        {isFetchingNextPage ? (
          <CircularProgress size={25} />
        ) : hasNextPage ? (
          <Button ref={ref}>Load more</Button>
        ) : null}
      </Box>
    </>
  );
};
