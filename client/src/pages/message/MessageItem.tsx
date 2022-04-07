import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import { PostImage } from 'components/Common/Posts/components';
type MessageProps = {
  isOwner: Boolean;
};
export const MessageItem: FC<MessageProps> = ({ isOwner }) => {
  return (
    <Box
      pb={1}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: isOwner ? 'row' : 'row-reverse',
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
        sx={{ width: 34, height: 34, border: '2px solid white' }}
      />
      <Box sx={styles.contentContainer}>
        {/* Content */}
        <Typography variant="body1" component="p" sx={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quam? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Odit, asperiores!
        </Typography>

        {/* Image */}
        <PostImage
          sx={{ px: 1 }}
          alt="not found image"
          imageUrl="https://res.cloudinary.com/djvd6zhbg/image/upload/v1645065070/postImage/fik7evjfx3bg0a5tzweq.png"
        />

        {/* Times */}
        <Typography fontSize={13} component="span" sx={styles.time}>
          30p truwosc
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  contentContainer: {
    '&>p': {
      bgcolor: '#5352ed',
      transition: 'all 0.4s ease-in-out',
      '&:hover+span': {
        opactiy: 1,
        visibility: 'visible',
      },
    },
    maxWidth: '80%',
  },

  time: {
    color: 'white',
    float: 'right',
    pt: '2px',
    opactiy: 0,
    visibility: 'hidden',
    transition: 'all 0.1s ease-in-out',
  },

  text: { maxWidth: '100%', borderRadius: 1, px: 1, py: 1, mx: 1 },
};
