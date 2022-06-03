import React, { useState } from 'react';
import { TextareaAutosize, IconButton, Typography, Box } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import Picker, { IEmojiData, SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

type Props = {
  autoFocus?: boolean;
  onSubmit: () => void;
  onTyping?: () => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties;
  label?: string;
  setLabel?: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  placeholder?: string;
};

export const TextareaSubmit = (props: Props) => {
  const {
    onSubmit,
    autoFocus = true,
    text,
    setText,
    style,
    label,
    setLabel,
    disabled = false,
    placeholder,
    onTyping,
  } = props;

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Backspace' && !text && setLabel && label) {
      onTyping && onTyping();
      setLabel('');
    }

    if (!(event.key === 'Enter' && event.shiftKey) && event.key === 'Enter') {
      onSubmit();
      return;
    }
  };

  const [openEmoji, setOpenEmoji] = useState(false);

  const onEmojiClick = (event: any, emojiObject: IEmojiData) => {
    setText((preText) => `${preText}${emojiObject.emoji}`);
  };

  return (
    <>
      {label && (
        <Typography sx={styles.label} fontSize={12} component="span">
          {label}
        </Typography>
      )}

      <TextareaAutosize
        placeholder={placeholder}
        autoFocus={autoFocus}
        value={text}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          onTyping && onTyping();
          setText(e.target.value);
        }}
        disabled={disabled}
        style={{ ...styles.textArea, ...style }}
      />
      {openEmoji && (
        <Box sx={{ position: 'absolute', right: 0, bottom: 40 }}>
          <Picker
            groupVisibility={{
              flags: false,
              food_drink: false,
              recently_used: false,
              symbols: false,
            }}
            skinTone={SKIN_TONE_MEDIUM_DARK}
            onEmojiClick={onEmojiClick}
          />
        </Box>
      )}

      <IconButton sx={styles.icons} onClick={() => setOpenEmoji(!openEmoji)}>
        <EmojiEmotionsOutlinedIcon />
      </IconButton>
    </>
  );
};

const styles: { [key: string]: any; textArea: React.CSSProperties } = {
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
  label: {
    borderRadius: 1,
    p: '2px 8px 2px 2px',
    background: 'rgb(48 48 48 / 90%)',
    m: '4px',
    mr: 0,
  },
  textArea: {
    flex: 1,
    outline: 'none',
    backgroundColor: '#1d1927',
    border: '0',
    color: '#c4c2c5',
    padding: '8px 4px',
    resize: 'none',
  },
};
