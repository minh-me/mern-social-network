import { FC, useEffect } from 'react';
import { Title } from 'components/App';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { CoverPhoto, PostList, ProfilePic, UserList } from 'components/Common';
import { FollowButton, IconsButtonOutlined, Tab } from 'components/Common/Buttons';
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';
import { blueGrey, grey, pink } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Post, User } from 'interface';
import { useInfinitePosts } from 'RQhooks/post.rq';
import { useInView } from 'react-intersection-observer';
const userFroms: User[] = [
  {
    profilePic:
      'https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png',
    name: 'Minh Chìu',
    username: 'minchiu',
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
    username: 'minchiu',
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
    username: 'minchiu',
    email: 'minhch.vn@gmail.com',
    role: 'admin',
    createdAt: '2022-03-08T14:12:58.562Z',
    updatedAt: '2022-03-08T14:25:39.750Z',
    id: '62271fw23646a0588488cd53eb293',
  },
];
const posts: Post[] = [
  {
    id: '123',
    text: 'thứ 5, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    postedBy: userFroms[0],
  },
  {
    id: '1234',
    text: 'thứ 523, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    image:
      'https://res.cloudinary.com/djvd6zhbg/image/upload/v1645065070/postImage/fik7evjfx3bg0a5tzweq.png',
    postedBy: userFroms[1],
  },
  {
    id: '1235',
    text: 'thứ 23, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    postedBy: userFroms[0],
  },
];

export const ProfilePage = () => {
  const isSelectedPosts = true;
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
        <Title title="Profile" />
      </Box>
      <Box>
        {/* Images */}
        <Box sx={{ height: '200px', position: 'relative' }}>
          <CoverPhoto />
          <Box sx={{ position: 'absolute', bottom: '-40px', left: 16 }}>
            <ProfilePic />
          </Box>
        </Box>
        {/* Profile buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} px={2} mt={2}>
          <IconsButtonOutlined>
            <LocalPostOfficeRoundedIcon fontSize="small" />
          </IconsButtonOutlined>
          <FollowButton isActive={true} />
        </Box>

        {/* Info */}
        <Box mt={2} px={2}>
          <Typography fontSize={22} textTransform="capitalize" color={pink[500]} fontWeight={600}>
            Minh Chìu
          </Typography>
          <Typography fontSize={14} color={grey[500]}>
            @minh.mchiu
          </Typography>
        </Box>

        {/* Numbers followers */}
        <Box px={2} sx={{ display: 'flex' }}>
          <Typography component={Link} to="/" sx={styles.numbersFollow}>
            <Typography component="span" fontWeight={600}>
              0
            </Typography>{' '}
            Following
          </Typography>
          <Typography component={Link} to="/" sx={styles.numbersFollow}>
            <Typography component="span" fontWeight={600}>
              3
            </Typography>{' '}
            Followers
          </Typography>
        </Box>
      </Box>
      {/* Tab control */}
      <Box mt={4} mx={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Tab onClick={() => console.log('Clicked!')} text="Posts" active={true} />
        <Tab onClick={() => console.log('Clicked!')} text="Replies" active={!true} />
      </Box>
      <Box sx={{ borderBottom: '1px solid #38444d' }} my={2} mt={4} />
      <Typography textAlign="center" fontSize={16}>
        Nothing to show.
      </Typography>

      {!isSelectedPosts && <UserList users={userFroms} />}
      {isSelectedPosts && (
        <>
          {/* PostList */}
          {data?.pages && <PostList data={data} />}

          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
          <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            {isFetchingNextPage ? (
              <CircularProgress size={25} />
            ) : hasNextPage ? (
              <Button ref={ref}>Load more</Button>
            ) : null}
          </Box>
        </>
      )}
    </>
  );
};

const styles = {
  numbersFollow: {
    transition: 'all 0.3s',
    textDecoration: 'none',
    color: blueGrey[400],
    mr: 2,
    fontSize: 15,
    '&:hover': { color: pink[400], textDecoration: 'underline' },
  },
};
