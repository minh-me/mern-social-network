import { FC } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import pink from '@mui/material/colors/pink';
import { UserInfo } from '../Users';
import { LoadingButton } from '@mui/lab';

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

export const Modal: FC<ModalProps> = (props) => {
  const { isLoading = false, disabledButton = false, buttonText = 'Submit' } = props;

  return (
    <Dialog sx={{ bottom: 'inherit' }} scroll="paper" open={props.open} onClose={props.onClose}>
      <DialogTitle sx={styles.title}>{props.title}</DialogTitle>
      <DialogContent sx={styles.contentContainer}>
        {/* User info */}
        <UserInfo />

        {/* Body */}
        {props.children}
      </DialogContent>

      {/* Button Submit */}
      <DialogActions sx={{ background: '#2c3140' }}>
        <LoadingButton
          loadingIndicator={`${buttonText}...`}
          loading={isLoading}
          variant="contained"
          size="small"
          type="submit"
          form={props.formId}
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
  title: { background: '#2c3140', color: 'white', textAlign: 'center' },

  contentContainer: { background: '#2c3140', minWidth: '466px', px: 2 },

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
