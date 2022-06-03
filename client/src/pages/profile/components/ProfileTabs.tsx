import { URLSearchParamsInit } from 'react-router-dom';
import { Box } from '@mui/material';
import { Tab } from '~/components/Common/Buttons';

type Props = {
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?: {
      replace?: boolean | undefined;
      state?: any;
    }
  ) => void;
  isTabReplies: boolean;
};

export const ProfileTabs = ({ setSearchParams, isTabReplies }: Props) => {
  return (
    <Box mt={4} mx={3} sx={{ display: 'flex', alignItems: 'center' }}>
      <Tab onClick={() => setSearchParams({ tab: 'posts' })} text="Posts" active={!isTabReplies} />
      <Tab
        onClick={() => setSearchParams({ tab: 'replies' })}
        text="Replies"
        active={isTabReplies}
      />
    </Box>
  );
};
