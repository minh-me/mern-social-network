import { useEffect } from 'react';
import { useInfiniteMyPosts } from 'RQhooks/post.rq';
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';
import { blueGrey, grey, pink } from '@mui/material/colors';

import { CoverPhoto, PostList, ProfilePic } from 'components/Common';
import { Title } from 'components/App';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { FollowButton, IconsButtonOutlined, Tab } from 'components/Common/Buttons';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { PostImageSkeleton, PostSkeleton, PostTextSkeleton } from 'components/Common/Variants';

export const ProfilePage = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteMyPosts();
  const isSelectedPosts = true;
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

      {/* {!isSelectedPosts && <UserList data={userFroms} />} */}
      {isSelectedPosts && (
        <>
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
