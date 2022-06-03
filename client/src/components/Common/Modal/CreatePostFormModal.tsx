import { FC, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import pink from '@mui/material/colors/pink';
import ImageIcon from '@mui/icons-material/Image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { postSchema } from '~/validations';
import { useCreatePost } from '~/RQhooks/post.rq';
import { ImagePreview } from '../Images/ImagePreview';
import { Modal } from './Modal';
import { FormInputFile } from '../HookForms/FormInputFile';
import { FormTextarea } from '../HookForms/FormTextarea';

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

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    const formData = new FormData();

    formData.append('text', data.text);

    if (data.image) formData.append('image', data.image[0]);

    await toast.promise(mutateAsync(formData), {
      pending: 'Posting in progress...',
      success: 'Post created successfully 👌',
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

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <Modal
      formId="createPostForm"
      buttonText="Post"
      isLoading={isLoading}
      title="Create Post"
      open={open}
      onClose={handleClose}
    >
      {/* Input container */}
      <form id="createPostForm" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.formContainer}>
          {/* Textarea */}
          <Box sx={{ width: '100%', my: 2 }}>
            <FormTextarea
              style={{ width: '100%', minHeight: 40, fontSize: 14 }}
              control={control}
              placeholder="Enter post text ..."
              required={true}
              name="text"
              onSubmit={handleSubmit(onSubmit)}
            />
          </Box>

          {/* Upload Image */}
          <Box sx={{ alignSelf: 'self-end' }}>
            <FormInputFile
              control={control}
              name="image"
              uploadButton={
                <IconButton component="span" sx={{ color: 'white', p: 0 }}>
                  <ImageIcon />
                </IconButton>
              }
            />
          </Box>
        </Box>

        {/* Image Preview  */}
        {watch('image') && watch('image').length > 0 && (
          <Box sx={styles.previewContainer}>
            <ImagePreview url={URL.createObjectURL(watch('image')[0])} />
          </Box>
        )}
      </form>
    </Modal>
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
      background: pink[400],
      div: {
        color: 'white',
      },
    },
  },
  formContainer: { display: 'flex', justifyContent: 'space-between' },
  previewContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
    maxHeight: '300px',
    px: 1,
    img: { objectFit: 'contain' },
  },
};
