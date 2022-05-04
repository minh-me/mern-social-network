import { styled } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

type Props = {
  control: Control<any, any>;
  name: string;
  uploadButton?: React.ReactNode;
};

export const FormInputFile = ({ control, name, uploadButton }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <label>
          <Input onChange={(e) => onChange(e.target.files)} type="file" />
          {uploadButton ? (
            uploadButton
          ) : (
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          )}
        </label>
      )}
    />
  );
};

const Input = styled('input')({
  display: 'none',
});
