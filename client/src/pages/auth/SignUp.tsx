import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInputText, FormInputDate } from 'components/Common';

import { registerSchema } from 'validations';
import { RegisterData } from 'interface';
import { styles } from './styles';
import { storage } from 'utils';
import { useEffect } from 'react';

const defaultValues: RegisterData = {
  email: '',
  name: '',
  password: '',
  dateOfBirth: null,
};

export const SignUp = () => {
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const token = storage.getToken();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterData> = (data) => console.log({ data });

  useEffect(() => {
    if (!!token) navigate('/', { replace: true });
  }, [token, navigate]);

  return (
    <Box sx={{ background: '#36393f', borderRadius: 2, p: 4, color: 'white' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Typography variant="h5" fontWeight="600" component="h3" align="center">
            Tạo tài khoản
          </Typography>
        </Box>

        <Box mb={3}>
          <FormInputText label="Email" name="email" autoFocus={true} control={control} />
        </Box>

        <Box mb={3}>
          <FormInputText label="Tên tài khoản" name="name" control={control} />
        </Box>

        <Box mb={3}>
          <FormInputText label="Password" name="password" type="password" control={control} />
        </Box>

        <Box mb={3}>
          <FormInputDate label="Ngày Sinh" name="dateOfBirth" control={control} />
        </Box>

        <Button variant="contained" fullWidth type="submit" sx={styles.button}>
          Đăng Ký
        </Button>

        <Box my={2}>
          <Typography sx={styles.text}>
            <Link to="/auth"> Already have an account?</Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};
