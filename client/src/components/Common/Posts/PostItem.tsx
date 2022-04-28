import { FC, memo } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputBase,
  IconButton,
  Avatar,
  Typography,
} from '@mui/material';
import { PostHeader, PostContent, PostFooter } from './components';
import { Post } from 'interface';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import GifOutlinedIcon from '@mui/icons-material/GifOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { CommentList } from '../Comments';

type PostItemProps = {
  post: Post;
};

export const PostItem: FC<PostItemProps> = memo(({ post }) => {
  return (
    <Box
      px={2}
      pt={3}
      pb={2}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: '100%',
        borderBottom: '1px solid #38444d',
      }}
    >
      {/* User info */}
      <Box px={2} sx={{ width: '100%' }}>
        <PostHeader user={post.postedBy} postCreated={post.createdAt} />

        {/* Post Content */}
        <PostContent text={post.text} imageUrl={post.image?.url} />

        {/* post footer */}
        <PostFooter />
        <Divider sx={{ bgcolor: '#38444d', my: 2 }} />

        {/* Comment */}
        <CommentList />
      </Box>
    </Box>
  );
});
