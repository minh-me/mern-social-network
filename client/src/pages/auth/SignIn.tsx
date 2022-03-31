import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInputText } from 'components/Common';
import { LoginData } from 'interface';
import { styles } from './styles';
import { loginSchema } from 'validations';

const defaultValues: LoginData = {
  email: '',
  password: '',
};

export const SignIn = () => {
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => console.log({ data });

  return (
    <Box sx={{ background: '#36393f', borderRadius: 2, p: 4, color: 'white' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Typography variant="h5" fontWeight="600" component="h3" align="center">
            Chào mừng trở lại!
          </Typography>
          <Typography color="#B9BBBE" variant="body2" fontWeight={300} align="center">
            Chúng tôi rất vui mừng được gặp lại bạn!
          </Typography>
        </Box>

        <Box mb={3}>
          <FormInputText label="Email" name="email" autoFocus={true} control={control} />
        </Box>

        <Box mb={3}>
          <FormInputText label="Password" name="password" type="password" control={control} />
          <Typography sx={styles.link}>Forgot your password?</Typography>
        </Box>

        <Button variant="contained" fullWidth type="submit" sx={styles.button}>
          Đăng Nhập
        </Button>

        <Box my={2}>
          <Typography sx={styles.text}>
            Need an account?
            <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};
