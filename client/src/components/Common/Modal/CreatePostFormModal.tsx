import { FC, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import pink from '@mui/material/colors/pink';
import ImageIcon from '@mui/icons-material/Image';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from 'interface';
import { toast, ToastContainer } from 'react-toastify';
import { UserInfo } from '../Users';
import { Image } from '../Images';
import { postSchema } from 'validations';

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};

interface InputProps {
  image: FileList;
  text: string;
}

export const CreatePostFormModal: FC<ModalProps> = ({ open, setOpen, user }) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    resetField,
    formState: { errors, dirtyFields },
  } = useForm<InputProps>({
    defaultValues: { text: '', image: undefined },
    resolver: yupResolver(postSchema),
    mode: 'onChange',
  });

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    console.log(data);
    toast.success(`🦄 Create post success!`, {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    handleClose();
  };

  useEffect(() => {
    if (errors?.image) {
      toast.error(`🦄 ${errors.image.message}!`, {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    resetField('image');
  }, [errors?.image, resetField]);

  return (
    <>
      <Dialog sx={{ bottom: 'inherit' }} scroll="paper" open={open} onClose={handleClose}>
        <DialogTitle sx={styles.title}>Create Post</DialogTitle>
        <DialogContent sx={styles.contentContainer}>
          {/* User info */}
          <UserInfo user={user} />

          {/* Input container */}
          <form id="createPostForm" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={styles.formContainer}>
              {/* Textarea */}
              <Controller
                control={control}
                name="text"
                render={({ field }) => (
                  <textarea {...field} placeholder="What's happending?" style={styles.textarea} />
                )}
              />

              {/* Image */}
              <Controller
                control={control}
                name="image"
                render={({ field: { onChange } }) => (
                  <label htmlFor="image" style={{ alignSelf: 'flex-end' }}>
                    <input
                      onChange={(e) => onChange(e.target.files)}
                      style={{ display: 'none' }}
                      id="image"
                      type="file"
                    />
                    <IconButton component="span" sx={{ color: 'white', p: 0 }}>
                      <ImageIcon />
                    </IconButton>
                  </label>
                )}
              />
            </Box>

            {/* Image Preview  */}
            {watch('image') && (
              <Box sx={styles.previewContainer}>
                <Image url={URL.createObjectURL(watch('image')[0])} />
              </Box>
            )}
          </form>
        </DialogContent>

        {/* Button Post */}
        <DialogActions sx={{ background: '#15202b' }}>
          <Button
            fullWidth
            disabled={!dirtyFields['text'] || Boolean(errors.text?.message)}
            sx={styles.button}
            variant="contained"
            size="small"
            type="submit"
            form="createPostForm"
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
      backgroundColor: '#b5496b',
      color: 'white',
    },
  },
  textarea: {
    color: 'white',
    minHeight: '64px',
    fontSize: 16,
    marginTop: 16,
    outline: 'none',
    border: 0,
    backgroundColor: 'transparent',
    width: '100%',
    flex: 1,
    paddingLeft: 12,
  },
  formContainer: { display: 'flex', justifyContent: 'space-between' },
  previewContainer: {
    margin: '0 auto',
    maxWidth: '400px',
    maxHeight: '400px',
  },
};
