import { FC, useState } from 'react';
import pink from '@mui/material/colors/pink';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type ModalInputProps = {
  title: string;
  open: boolean;
  onClose: Function;
  position?: 'top' | 'center';
  inputValue: string;
  onSubmit: Function;
};

export const MDialogInput: FC<ModalInputProps> = (props) => {
  const { position = 'top', title, open, onClose, inputValue, onSubmit } = props;

  const [value, setValue] = useState(inputValue);

  return (
    <Dialog
      sx={{ bottom: position === 'center' ? 0 : 'inherit' }}
      maxWidth="md"
      open={open}
      onClose={() => onClose()}
    >
      <DialogTitle
        sx={{ background: '#36393f', color: 'rgb(13, 202, 240)', fontSize: 16, fontWeight: 400 }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ background: '#36393f', maxWidth: '100%' }}>
        <Box sx={styles.inputContainer}>
          <input onChange={(e) => setValue(e.target.value)} value={value} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ background: '#2f3136' }}>
        <Button
          disabled={value === inputValue || value.trim().length < 2}
          onClick={() => onSubmit(value)}
          sx={styles.button}
          size="small"
        >
          Okay!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  button: {
    color: '#fff',
    background: pink[500],
    textTransform: 'capitalize',
    fontWeight: '400',
    '&:hover': {
      background: pink[400],
    },
    '&:disabled': {
      color: '#d1d1d1',
      bgcolor: '#b72a5a',
    },
  },
  inputContainer: {
    input: {
      minWidth: 432,
      outline: 'none',
      border: '1px solid #5e5e5e',
      padding: '8px 16px',
      fontSize: '18px',
      borderRadius: '20px',
      color: 'rgb(233, 30, 99)',
      background: '#2f3136',
      transition: 'all 0.3s',
      fontWeight: 500,
    },
    'input:hover': {
      borderColor: 'rgb(206, 193, 193)',
    },
  },
};
