import { FC } from 'react';
import { TextField, FormHelperText, Typography } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './FormInputProps';
import dayjs from 'dayjs';

const minDate = dayjs('1980-01-25');
const maxDate = dayjs('2014-01-25');

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

export const FormInputDate: FC<FormInputProps> = ({ control, name, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Typography sx={styles.label} component="label" htmlFor={name}>
            {label}
          </Typography>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
              inputFormat="MM/DD/YYYY"
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              onChange={onChange}
              renderInput={(params) => (
                <TextField
                  size="small"
                  id={name}
                  sx={{
                    marginTop: '4px',
                    input: {
                      color: 'white',
                      background: '#303338',
                    },
                    svg: {
                      color: 'white',
                    },
                  }}
                  fullWidth
                  {...params}
                  error={!!error}
                />
              )}
            />
          </LocalizationProvider>

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
