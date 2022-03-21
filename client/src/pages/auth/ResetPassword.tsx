import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormInputText } from 'components/Common';

interface IFormLoginData {
  email: string;
  password: string;
}

const loginSchema = yup
  .object({
    email: yup.string().email().required().label('Email'),
    password: yup.string().required().label('Password'),
  })
  .required();

const defaultValues = {
  email: '',
  password: '',
};

export const ResetPassword = () => {
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormLoginData> = (data) => console.log({ data });

  return (
    <Box sx={{ background: '#36393f', borderRadius: 2, p: 4, color: 'white' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Typography variant="h5" fontWeight="600" component="h3" align="center">
            Reset Password
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography
            fontWeight="500"
            component="label"
            color="#b9bbbe"
            fontSize="small"
            textTransform="uppercase"
          >
            Password
          </Typography>
          <FormInputText name="password" autoFocus={true} type="password" control={control} />
        </Box>

        <Button
          variant="contained"
          fullWidth
          type="submit"
          size="large"
          sx={{
            color: '#fff',
            background: pink[500],
            textTransform: 'capitalize',
            fontWeight: '400',
            '&:hover': {
              background: pink[400],
            },
          }}
        >
          Reset
        </Button>
      </form>
    </Box>
  );
};
