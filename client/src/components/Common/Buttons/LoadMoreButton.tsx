import { useEffect } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';

type Props = {
  isFetching: boolean;
  totalResults: number;
  limit: number;
  onChangeLimit: (limit: number) => void;
};

export const LoadMoreButton = ({ isFetching, totalResults, limit, onChangeLimit }: Props) => {
  return (
    <Box mb={3} sx={{ display: 'flex', justifyContent: 'center' }}>
      {isFetching ? (
        <CircularProgress size={25} />
      ) : totalResults > limit ? (
        <Button sx={{ textTransform: 'capitalize' }} onClick={() => onChangeLimit(limit + 8)}>
          Load more
        </Button>
      ) : null}
    </Box>
  );
};

export const LoadMoreInView = ({ isFetching, totalResults, limit, onChangeLimit }: Props) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!isFetching && inView) onChangeLimit(limit + 8);
  }, [inView, onChangeLimit, isFetching, limit]);

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
