import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Twemoji } from 'react-emoji-render';
import Avatar from '@mui/material/Avatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Message } from '~/interface';
import { ImageWithModal } from '~/components/Common/Images/ImageWithModal';

dayjs.extend(relativeTime);

type MessageProps = {
  isOwner: Boolean;
  message: Message;
};

export const MessageItem: FC<MessageProps> = ({ isOwner, message }) => {
  const isGroupChat = message.chat.isGroupChat;

  let bgText = isOwner ? '#5352ed' : '#3E4042';
  if (message.isRename) bgText = 'transparent';

  return (
    <Box
      pb={1}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: isOwner ? 'row-reverse' : 'row',
        justifyContent: 'flex-start',
      }}
    >
      <Avatar
        alt={message.sender.username}
        src={message.sender.profilePic.url}
        sx={{ width: 34, height: 34, border: '2px solid white' }}
      />
      <Box
        sx={{
          ...styles.contentContainer,
          width: message.isRename ? '100%' : 'inherit',
          maxWidth: message.isRename ? '100%' : '80%',
          textAlign: 'center',
        }}
      >
        {isGroupChat && !isOwner && (
          <Typography sx={{ width: '100%' }} color="#898989" fontSize={12}>
            {message.sender.name}
          </Typography>
        )}

        {/* Content */}
        {message.text && (
          <Typography
            variant="body1"
            sx={{ ...styles.text, bgcolor: bgText }}
            component={Twemoji}
            text={message.text}
            color={message.isRename ? '#b7b7b7' : '#ebebeb'}
            fontSize={message.isRename ? 12 : 15}
          />
        )}

        {/* Image */}
        {message.image && (
          <ImageWithModal
            sx={{ px: 1, mt: 1 }}
            alt="not found image"
            imageUrl={message.image.url}
          />
        )}

        {/* Times */}
        <Typography
          fontSize={9}
          component="span"
          sx={{ ...styles.time, float: isOwner ? 'left' : 'right' }}
        >
          {dayjs(message.createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    px: 1,
    '&>p': {
      transition: 'all 0.4s ease-in-out',
    },
    maxWidth: '80%',
    '&:hover span': {
      opactiy: 1,
      visibility: 'visible',
    },
  },

  time: {
    color: 'white',
    pt: '2px',
    opactiy: 0,
    visibility: 'hidden',
    transition: 'all 0.1s ease-in-out',
  },

  text: { maxWidth: '100%', borderRadius: 1, p: 1 },
};
