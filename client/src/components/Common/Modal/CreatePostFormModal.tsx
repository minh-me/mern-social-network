import { FC, useEffect } from 'react';
import { Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import pink from '@mui/material/colors/pink';
import ImageIcon from '@mui/icons-material/Image';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { UserInfo } from '../Users';
import { Image } from '../Images';
import { postSchema } from 'validations';
import { useCreatePost } from 'RQhooks/post.rq';
import { LoadingButton } from '@mui/lab';

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface InputProps {
  image: FileList;
  text: string;
}

const defaultValues = { text: '', image: undefined };

export const CreatePostFormModal: FC<ModalProps> = ({ open, setOpen }) => {
  const methods = useForm<InputProps>({
    defaultValues,
    resolver: yupResolver(postSchema),
    mode: 'onChange',
  });

  const { control, handleSubmit, watch, reset, resetField, formState } = methods;

  const { mutateAsync, isLoading } = useCreatePost();
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    const formData = new FormData();
    formData.append('text', data.text);
    if (data.image) formData.append('image', data.image[0]);
    await toast.promise(mutateAsync(formData), {
      pending: 'Posting in progress...',
      // success: 'Post created successfully 👌',
      error: 'Post created failed 🤯',
    });
    handleClose();
  };

  useEffect(() => {
    if (formState.errors?.image) {
      toast.error(`🦄 ${formState.errors.image.message}!`);
    }
    resetField('image');
  }, [formState.errors?.image, resetField]);

  return (
    <>
      <Dialog sx={{ bottom: 'inherit' }} scroll="paper" open={open} onClose={handleClose}>
        <DialogTitle sx={styles.title}>Create Post</DialogTitle>
        <DialogContent sx={styles.contentContainer}>
          {/* User info */}
          <UserInfo />

          {/* Input container */}
          <form id="createPostForm" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={styles.formContainer}>
              {/* Textarea */}
              <Controller
                control={control}
                name="text"
                render={({ field }) => (
                  <textarea
                    {...field}
                    autoFocus
                    placeholder="What's happending?"
                    style={styles.textarea}
                  />
                )}
              />

              {/* -------------------------------- */}
              {/* --------Start Image Upload-------- */}
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
            {/* --------End Image Upload-------- */}
            {/* -------------------------------- */}
          </form>
        </DialogContent>

        {/* Button Post */}
        <DialogActions sx={{ background: '#15202b' }}>
          <LoadingButton
            loadingIndicator="Post..."
            loading={isLoading}
            variant="contained"
            size="small"
            type="submit"
            form="createPostForm"
            fullWidth
            sx={styles.button}
            disabled={!formState.dirtyFields['text'] || Boolean(formState.errors.text?.message)}
          >
            Post
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
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
    maxHeight: '80%',
  },
};
