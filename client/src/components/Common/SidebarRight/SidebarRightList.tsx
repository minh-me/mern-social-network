import { Typography } from '@mui/material';

type Props = {
  children: JSX.Element[] | JSX.Element | string;
  title: string;
};

export const SidebarRightList = ({ title, children }: Props) => {
  return (
    <>
      <Typography sx={{ px: 2, pb: 0, pt: 2, fontSize: 18, fontWeight: 600 }}>{title}</Typography>
      {children}
    </>
  );
};
