import { FormHelperText, OutlinedInput } from '@mui/material';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './FormInputProps';

export const FormInputText: FC<FormInputProps> = ({ control, name, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <OutlinedInput
            fullWidth
            color="info"
            onChange={onChange}
            value={value}
            size="small"
            error={!!error}
            sx={{
              color: 'white',
              background: '#303338',
              marginTop: '2px',
            }}
            {...rest}
          />

          {!!error && (
            <FormHelperText component="span" error={true}>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};
