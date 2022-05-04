import { Button } from '@mui/material';

type Props = {
  onClick?: () => void;
  text?: string;
};

export const CancelButton = ({ onClick, text = 'cancel' }: Props) => {
  return (
    <Button
      size="small"
      variant="outlined"
      color="error"
      sx={{ textTransform: 'capitalize', mr: 1 }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
