import { FC } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import pink from '@mui/material/colors/pink';
import { SubmitHandler } from 'react-hook-form';
import { UserInfo } from '../Users';
import { LoadingButton } from '@mui/lab';
import { ImageUploadForm, ImageUploadFormProps } from '../Forms';
import { useUploadCoverPhoto } from 'RQhooks';
import { toast } from 'react-toastify';

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UploadCoverPhotoModal: FC<ModalProps> = ({ open, setOpen }) => {
  const { mutateAsync, isLoading } = useUploadCoverPhoto();
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<ImageUploadFormProps> = async (data) => {
    const formData = new FormData();
    formData.append('coverPhoto', data.image[0]);
    await toast.promise(mutateAsync(formData), {
      pending: 'Upload...',
      success: 'Updated cover photo successfully!',
    });
    handleClose();
  };

  return (
    <>
      <Dialog sx={{ bottom: 'inherit' }} scroll="paper" open={open} onClose={handleClose}>
        <DialogTitle sx={styles.title}>Change Cover Photo</DialogTitle>
        <DialogContent sx={styles.contentContainer}>
          {/* User info */}
          <UserInfo />

          {/* Input container */}
          <ImageUploadForm formId="coverPhoto" onSubmit={onSubmit} />
        </DialogContent>

        {/* Button Post */}
        <DialogActions sx={{ background: '#15202b' }}>
          <LoadingButton
            loadingIndicator="Uploading..."
            loading={isLoading}
            variant="contained"
            size="small"
            type="submit"
            form="coverPhoto"
            fullWidth
            sx={styles.button}
          >
            Upload
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
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
    '&:hover': {
      background: pink[400],
    },
    '&:disabled': {
      background: pink[400],
      div: {
        color: 'white',
      },
    },
  },
};
