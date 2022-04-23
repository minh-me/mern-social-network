import { FC, useEffect, useRef } from 'react';
import { Post, PostsResponse } from 'interface';
import { PostItem } from './PostItem';
import { useInfinitePosts } from 'RQhooks/post.rq';
import { Box, Button, CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { InfiniteData } from 'react-query';

type PostListProps = {
  data: InfiniteData<PostsResponse>;
};

export const PostList: FC<PostListProps> = ({ data }) => {
  return (
    <>
      {data.pages.map((page) => {
        return page.posts.map((post) => <PostItem key={post.id} post={post} />);
      })}
    </>
  );
};
