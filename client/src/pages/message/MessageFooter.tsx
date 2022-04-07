import { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { blueGrey } from '@mui/material/colors';
import TextareaAutosize from 'react-textarea-autosize';
import { styleScroll } from 'utils';

type Props = {};

export const MessageFooter = (props: Props) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const handleInputChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log({ text: e.target });
  };
  return (
    <Box sx={styles.textareaContainer}>
      <TextareaAutosize
        ref={ref}
        maxRows={4}
        autoFocus={true}
        // onChange={handleInputChange}
        onKeyDown={handleInputChange}
        placeholder="Type a message..."
      />
      <input type="file" style={{ display: 'none' }} id="upload-image" />

      <IconButton sx={{ color: '#f91880' }}>
        <SendRoundedIcon />
      </IconButton>
      <IconButton sx={{ color: '#f91880' }} component="label" htmlFor="upload-image">
        <ImageRoundedIcon />
      </IconButton>
    </Box>
  );
};

const styles = {
  textareaContainer: {
    display: 'flex',
    alignItems: 'center',
    px: 2,
    py: 2,
    textarea: {
      outline: 'none',
      fontWeight: 500,
      borderRadius: 4,
      pb: 0,
      width: '100%',
      resize: 'none',
      overflowY: 'auto',
      fontSize: 14,
      padding: '8px 12px',
      flex: 1,
      height: 20,
      background: '#1f2e3b',
      border: '1px solid #38444d',
      color: 'rgb(233, 30, 99)',
      transition: 'all 0.2s ease-in-out',
      ...styleScroll,
    },
    'textarea:hover': {
      borderColor: '#4e6272',
    },
  },
};
