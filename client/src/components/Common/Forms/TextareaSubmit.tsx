import React from 'react';
import { TextareaAutosize, IconButton, Typography } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
type Props = {
  autoFocus?: boolean;
  handleSubmit: () => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties;
  label?: string;
  setLabel?: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
};

export const TextareaSubmit = ({
  handleSubmit,
  autoFocus = true,
  text,
  setText,
  style,
  label,
  setLabel,
  disabled = false,
}: Props) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Backspace' && !text && setLabel && label) setLabel('');

    if (!(event.key === 'Enter' && event.shiftKey) && event.key === 'Enter') {
      handleSubmit();
      return;
    }
  };

  return (
    <>
      {label && (
        <Typography
          sx={{
            borderRadius: 1,
            p: '2px 8px 2px 2px',
            background: 'rgb(48 48 48 / 90%)',
            m: '4px',
            mr: 0,
          }}
          fontSize={12}
          component="span"
        >
          {label}
        </Typography>
      )}
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Enter comment..."
        autoFocus={autoFocus}
        value={text}
        onKeyDown={handleKeyDown}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        style={{
          flex: 1,
          outline: 'none',
          backgroundColor: '#1d1927',
          border: '0',
          color: '#c4c2c5',
          padding: '8px 4px',
          resize: 'none',
          ...style,
        }}
      />

      <IconButton sx={styles.icons}>
        <EmojiEmotionsOutlinedIcon />
      </IconButton>
    </>
  );
};

const styles = {
  icons: {
    color: '#898b8e',
    cursor: 'pointer',
    transition: 'all 0.3s',
    p: '4px',
    '&:hover': {
      bgcolor: '#3a3b3c',
    },
    svg: {
      height: 18,
      width: 18,
    },
  },
};
