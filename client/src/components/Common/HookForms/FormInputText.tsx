import { FormHelperText, OutlinedInput, Typography } from '@mui/material';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './FormInputProps';

export const FormInputText: FC<FormInputProps> = ({ control, name, label, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Typography htmlFor={name} component="label" sx={styles.label}>
            {label}
          </Typography>
          <OutlinedInput
            fullWidth
            color="info"
            onChange={onChange}
            value={value}
            id={name}
            size="small"
            error={!!error}
            sx={styles.input}
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

const styles = {
  label: {
    fontSize: 'small',
    color: '#b9bbbe',
    textTransform: 'uppercase',
    fontWeight: 400,
  },
  input: {
    color: 'white',
    background: '#303338',
    marginTop: '2px',
  },
};
