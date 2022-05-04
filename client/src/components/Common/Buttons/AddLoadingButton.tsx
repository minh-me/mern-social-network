import { LoadingButton } from '@mui/lab';
import { pink } from '@mui/material/colors';

type Props = {
  onClick?: () => void;
  loading?: boolean;
  text?: string;
};

export const AddLoadingButton = ({ onClick, loading, text = 'Add' }: Props) => {
  return (
    <LoadingButton
      loading={loading}
      onClick={onClick}
      size="small"
      variant="outlined"
      sx={{
        textTransform: 'capitalize',
        '&:disabled': { background: pink[400], div: { color: 'white' } },
      }}
    >
      {text}
    </LoadingButton>
  );
};
