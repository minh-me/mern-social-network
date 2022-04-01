import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ModalProps = {
  title?: string;
  content?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ResponsiveDialog: FC<ModalProps> = ({ title, content, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle sx={{ background: '#36393f', color: 'white' }}>{title}</DialogTitle>
        <DialogContent sx={{ background: '#36393f' }}>
          <DialogContentText sx={{ color: 'white' }}>{content}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: '#36393f' }}>
          <Button variant="contained" onClick={handleClose} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
