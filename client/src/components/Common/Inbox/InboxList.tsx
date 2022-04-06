import { Box } from '@mui/material';
import { InboxItem } from './InboxItem';

type Props = {};

export const InboxList = (props: Props) => {
  return (
    <>
      <InboxItem />
      <InboxItem />
      <InboxItem />
    </>
  );
};
