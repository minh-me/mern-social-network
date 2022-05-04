import React, { useEffect } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { limitPosts } from 'contants/pagination';

type Props = {
  isFetching: boolean;
  totalResults: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

export const LoadMoreButton = ({ isFetching, totalResults, limit, setLimit }: Props) => {
  return (
    <Box mb={3} sx={{ display: 'flex', justifyContent: 'center' }}>
      {isFetching ? (
        <CircularProgress size={25} />
      ) : totalResults > limit ? (
        <Button
          sx={{ textTransform: 'capitalize' }}
          onClick={() => setLimit((prev) => prev + limitPosts)}
        >
          Load more
        </Button>
      ) : null}
    </Box>
  );
};

export const LoadMoreInView = ({ isFetching, totalResults, limit, setLimit }: Props) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!isFetching && inView) {
      setLimit((prev) => prev + limitPosts);
    }
  }, [inView, setLimit, isFetching]);

  return (
    <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
      {isFetching ? (
        <CircularProgress size={25} />
      ) : totalResults > limit ? (
        <CircularProgress ref={ref} size={25} />
      ) : null}
    </Box>
  );
};
