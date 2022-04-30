import { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';

import { LoadMoreInView, Title } from 'components/App';
import { useMyPosts } from 'RQhooks/post.rq';
import { PostList } from 'components/Common';
import { Tab } from 'components/Common/Buttons';
import { PostSkeleton } from 'components/Common/Variants';
import { ProfileHeader } from './ProfileHeader';
import { ProfileButtons } from './ProfileButtons';
import { ProfileInfo } from './ProfileInfo';
import { ProfileFollowers } from './ProfileFollowers';
import { useAppContext } from 'hooks/useAppContext';
import { Tab_MyPostList } from './Tab_MyPostList';

export const ProfilePage = () => {
  const {
    state: { auth },
  } = useAppContext();
  const isSelectedPosts = true;

  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Profile" />
      </Box>

      {/* Header */}
      <Box>
        <ProfileHeader />
        <ProfileButtons />
        <ProfileInfo />
        <ProfileFollowers />
      </Box>

      {/* Tab control */}
      <Box mt={4} mx={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Tab onClick={() => console.log('Clicked!')} text="Posts" active={true} />
        <Tab onClick={() => console.log('Clicked!')} text="Replies" active={!true} />
      </Box>

      <Divider sx={{ borderBottom: '1px solid #38444d', my: 2, mt: 4 }} />

      {/* {!isSelectedPosts && <UserList data={userFroms} />} */}
      {isSelectedPosts && <Tab_MyPostList />}
    </>
  );
};
