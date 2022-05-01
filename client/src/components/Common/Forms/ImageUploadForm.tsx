import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { uploadSchema } from 'validations';
import { Image } from '../Images';

export interface ImageUploadFormProps {
  image: FileList;
}

type Props = {
  title?: string;
  formId: string;
  onSubmit: SubmitHandler<ImageUploadFormProps>;
  previewSize?: {
    maxWidth?: string;
    maxHeight?: string;
    borderRadius?: string;
  };
};

export const ImageUploadForm = ({ formId, onSubmit, previewSize }: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<ImageUploadFormProps>({
    defaultValues: { image: undefined },
    resolver: yupResolver(uploadSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (errors?.image) {
      toast.error(`🦄 ${errors.image.message}!`);
    }
    resetField('image');
  }, [errors?.image, resetField]);

  return (
    <>
      {/* Input container */}
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.formContainer}>
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
                <Button size="small" component="span" variant="outlined">
                  Upload
                </Button>
              </label>
            )}
          />
        </Box>
      </form>
      {/* Image Preview  */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {watch('image') && (
          <Box sx={{ ...styles.previewContainer, ...previewSize }}>
            <Image
              url={URL.createObjectURL(watch('image')[0])}
              sx={{ borderRadius: previewSize?.borderRadius ? previewSize?.borderRadius : '4px' }}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

const styles = {
  formContainer: { width: '100%', m: 2 },
  previewContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
    maxHeight: '300px',
    mt: 2,
  },
};
