import { FC } from 'react';
import pink from '@mui/material/colors/pink';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type ModalProps = {
  title: string;
  open: boolean;
  onClose: Function;
  entityId?: string;
  children: JSX.Element[] | JSX.Element | string;
};

export const CreatePostFormModal: FC<ModalProps> = ({ title, open, children, onClose }) => {
  return (
    <Dialog sx={{ bottom: 'inherit' }} scroll="paper" open={open} onClose={() => onClose()}>
      <DialogTitle sx={{ background: '#15202b', color: 'white', textAlign: 'center' }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ background: '#15202b', minWidth: '466px', px: 2 }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ background: '#15202b' }}>
        <Button
          fullWidth
          disabled={true}
          sx={styles.button}
          variant="contained"
          size="small"
          onClick={() => onClose()}
        >
          Post
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
    mb: 1,
    '&:hover': {
      background: pink[400],
    },
    '&:disabled': {
      backgroundColor: '#b5496b',
      color: 'white',
    },
  },
};
