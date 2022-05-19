import { Button } from '@mui/material';

type Props = {
  onClick?: () => void;
  text?: string;
  disabled?: boolean;
};

export const CancelButton = ({ onClick, text = 'cancel', disabled = false }: Props) => {
  return (
    <Button
      size="small"
      variant="outlined"
      color="error"
      sx={{ textTransform: 'capitalize', mr: 1 }}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};
