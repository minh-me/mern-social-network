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
  confirmButton: Function;
  entityId?: string;
  children: JSX.Element[] | JSX.Element | string;
  type?: 'delete' | 'ok';
  position?: 'top' | 'center';
  textAlign?: 'center' | 'left';
  isLoading?: boolean;
};

export const MDialog: FC<ModalProps> = (props) => {
  const { type = 'ok', position = 'top', textAlign = 'left', isLoading = false } = props;

  return (
    <Dialog
      sx={{ bottom: position === 'center' ? 0 : 'inherit' }}
      maxWidth="xs"
      open={props.open}
      onClose={() => props.onClose()}
    >
      <DialogTitle sx={{ background: '#36393f', color: '#f91880', textAlign }}>
        {props.title}
      </DialogTitle>
      <DialogContent sx={{ background: '#36393f' }}>
        <DialogContentText sx={{ color: '#DCDDDE', fontWeight: 400, fontSize: 14, textAlign }}>
          {props.children}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ background: '#2f3136' }}>
        {type === 'delete' ? (
          <Button
            size="small"
            color="error"
            variant="contained"
            disabled={isLoading}
            onClick={() => props.confirmButton(props.entityId)}
          >
            Xóa
          </Button>
        ) : (
          <Button
            disabled={isLoading}
            sx={styles.button}
            variant="contained"
            onClick={() => props.confirmButton(props.entityId)}
          >
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
