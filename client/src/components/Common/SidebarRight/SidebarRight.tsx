import { Box } from '@mui/material';

import { FormSearch } from '~/pages/search/FormSearch';
import { TabPostList } from '~/pages/search/Tab_PostList';
import { TabUserList } from '~/pages/search/Tab_UserList';
import { styleScroll } from '~/utils';

import { SidebarRightList } from './SidebarRightList';

export const SidebarRight = () => {
  return (
    <Box sx={styles.SidebarContainer}>
      <Box mx={2} py={2} sx={styles.FormSearchContainer}>
        <FormSearch name="search" to="/search" />
      </Box>

      {/* Posts */}
      <Box sx={styles.SidebarPosts}>
        <SidebarRightList title="Trends for you">
          <TabPostList followingOnly={false} sort="-numberLikes" limit={5} />
        </SidebarRightList>
      </Box>

      {/* Users */}
      <Box mt={2} sx={styles.SidebarUsers}>
        <SidebarRightList title="Who to follow">
          <TabUserList sort="-numberFollowers" limit={5} />
        </SidebarRightList>
      </Box>
    </Box>
  );
};

const styles = {
  SidebarContainer: {
    maxHeight: '100vh',
    scrollBehavior: 'smooth',
    overflowY: 'auto',
    ...styleScroll,
    '&::-webkit-scrollbar': {
      width: 2,
    },
  },

  FormSearchContainer: {
    ml: '12px',
    mr: '8px',
    input: { p: '6px 12px', fontSize: 14 },
  },

  SidebarPosts: {
    borderRadius: '20px',
    ml: '12px',
    mr: '8px',
    '& > div': {
      maxWidth: '234px',

      '& > div': {
        p: 0,
      },
    },
    a: {
      fontSize: '12px',
    },
    p: {
      fontSize: '10px',
    },
    span: {
      fontSize: '14px',
    },
  },

  SidebarUsers: {
    borderRadius: '20px',
    ml: '12px',
    mr: '8px',
    button: {
      p: '4px',
      fontSize: '10px',
    },
    a: {
      fontSize: '12px',
    },
    p: {
      fontSize: '10px',
    },
  },
};
