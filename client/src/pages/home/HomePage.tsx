import { Box } from '@mui/material';
import { Title } from 'components/App';
import { CreatePostForm } from 'components/Common/Posts/CreatePostForm';

export const HomePage = () => {
  return (
    <>
      <Box sx={styles.titleContainer}>
        <Title title="Home" />
      </Box>

      <Box py={2} px={2} sx={styles.postFormContainer}>
        <CreatePostForm />
      </Box>

      <Box sx={{ height: '300px' }}>lorem20</Box>
      <Box sx={{ height: '300px' }}>lorem20</Box>
      <Box sx={{ height: '300px' }}>lorem20</Box>
      <Box sx={{ height: '300px' }}>lorem20</Box>
    </>
  );
};
const styles = {
  titleContainer: { borderBottom: '1px solid #38444d' },
  postFormContainer: {
    borderBottom: '8px solid #38444d',
    minHeight: 98,
    display: 'flex',
    alignItems: 'start',
  },
  avatar: { width: 42, height: 42, border: '2px solid white' },
  textField: { input: { color: 'white', py: 1, ml: 2, fontSize: 18, pb: 4 } },
  button: {
    alignSelf: 'flex-end',
    textTransform: 'capitalize',
    borderRadius: 5,
    bgcolor: '#b5496b',
    '&:disabled': {
      bgcolor: '#b5496b',
      color: 'white',
    },
  },
};
