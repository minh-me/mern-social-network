import { Box, Divider } from '@mui/material';

import { Title } from 'components/App';
import { Tab } from 'components/Common/Buttons';
import { TabMyPostList } from './Tab_MyPostList';
import { ProfileHeader } from './ProfileHeader';

export const ProfilePage = () => {
  const isSelectedPosts = true;

  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Profile" />
      </Box>

      {/* Header */}
      <ProfileHeader />

      {/* Tab control */}
      <Box mt={4} mx={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Tab onClick={() => console.log('Clicked!')} text="Posts" active={true} />
        <Tab onClick={() => console.log('Clicked!')} text="Replies" active={!true} />
      </Box>

      <Divider sx={{ borderBottom: '1px solid #38444d', my: 2, mt: 4 }} />

      {/* {!isSelectedPosts && <UserList data={userFroms} />} */}
      {isSelectedPosts && <TabMyPostList />}
    </>
  );
};
