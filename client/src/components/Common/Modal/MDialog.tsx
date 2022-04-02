import { FC } from 'react';
import pink from '@mui/material/colors/pink';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ModalProps = {
  title: string;
  open: boolean;
  onClose: Function;
  entityId?: string;
  children: JSX.Element[] | JSX.Element | string;
  type: 'delete' | 'ok';
};

export const MDialog: FC<ModalProps> = ({ type, title, open, children, onClose, entityId }) => {
  return (
    <Dialog maxWidth="xs" open={open} onClose={() => onClose()}>
      <DialogTitle sx={{ background: '#36393f', color: '#f91880' }}>{title}</DialogTitle>
      <DialogContent sx={{ background: '#36393f' }}>
        <DialogContentText sx={{ color: '#DCDDDE', fontWeight: 400, fontSize: 14 }}>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ background: '#2f3136' }}>
        {type === 'delete' ? (
          <Button size="small" color="error" variant="contained" onClick={() => onClose(entityId)}>
            Xóa
          </Button>
        ) : (
          <Button sx={styles.button} variant="contained" onClick={() => onClose(entityId)}>
            Okay!
          </Button>
        )}
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
  },
};
