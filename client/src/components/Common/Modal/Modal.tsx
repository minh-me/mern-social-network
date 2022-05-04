import { FC, useEffect } from 'react';
import { Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import pink from '@mui/material/colors/pink';
import ImageIcon from '@mui/icons-material/Image';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { UserInfo } from '../Users';
import { postSchema } from 'validations';
import { useCreatePost } from 'RQhooks/post.rq';
import { LoadingButton } from '@mui/lab';
import { ImagePreview } from '../Images/ImagePreview';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  disabledButton?: boolean;
  buttonText?: string;
  formId?: string;
};

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  isLoading = false,
  disabledButton = false,
  formId,
  buttonText = 'Submit',
}) => {
  return (
    <Dialog sx={{ bottom: 'inherit' }} scroll="paper" open={open} onClose={onClose}>
      <DialogTitle sx={styles.title}>{title}</DialogTitle>
      <DialogContent sx={styles.contentContainer}>
        {/* User info */}
        <UserInfo />

        {/* Body */}
        {children}
      </DialogContent>

      {/* Button Submit */}
      <DialogActions sx={{ background: '#15202b' }}>
        <LoadingButton
          loadingIndicator={`${buttonText}...`}
          loading={isLoading}
          variant="contained"
          size="small"
          type="submit"
          form={formId}
          fullWidth
          sx={styles.button}
          disabled={disabledButton}
        >
          {buttonText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  title: { background: '#15202b', color: 'white', textAlign: 'center' },

  contentContainer: { background: '#15202b', minWidth: '466px', px: 2 },

  button: {
    color: '#fff',
    background: pink[500],
    textTransform: 'capitalize',
    fontWeight: '400',
    mb: 1,
    '&:hover': { background: pink[400] },
    '&:disabled': { background: pink[400], div: { color: 'white' } },
  },
};
