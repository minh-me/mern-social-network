import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useForm, SubmitHandler, ErrorOption } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInputText } from 'components/Common';
import { LoginData } from 'interface';
import { styles } from './styles';
import { emailSchema, loginSchema } from 'validations';
import { useEffect, useState } from 'react';
import { MDialog } from 'components/Common/Modal';
import { useForgotPassword, useLogin } from 'RQhooks';
import { LoadingButton } from '@mui/lab';
import { storage } from 'utils';

const defaultValues: LoginData = {
  email: '',
  password: '',
};

export const SignIn = () => {
  const { control, handleSubmit, getValues, setError } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const token = storage.getToken();

  const { mutate: login, isLoading: isLogging } = useLogin();
  const { mutateAsync: forgotPassword, isLoading } = useForgotPassword();
  const onSubmit: SubmitHandler<LoginData> = (data) => login(data);

  const [openModal, setOpenModal] = useState(false);
  const handleClickForgotPass = async () => {
    try {
      const email = getValues('email');
      await emailSchema.validate({ email });
      await forgotPassword(email);
      setOpenModal(true);
    } catch (error) {
      setError('email', error as ErrorOption);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!!token) navigate('/', { replace: true });
  }, [token, navigate]);

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
          {isLoading ? (
            <Typography fontSize={12} color="primary">
              Requesting forgot password...
            </Typography>
          ) : (
            <Typography sx={styles.link} onClick={handleClickForgotPass}>
              Forgot your password?
            </Typography>
          )}
        </Box>

        <LoadingButton
          loadingIndicator="Logging..."
          loading={isLogging}
          variant="contained"
          fullWidth
          type="submit"
          sx={styles.button}
        >
          Đăng Nhập
        </LoadingButton>

        <Box my={2}>
          <Typography sx={styles.text}>
            Need an account?
            <Link to="/auth/register">Register</Link>
          </Typography>
        </Box>
      </form>

      <MDialog
        type="ok"
        position="center"
        onClose={() => setOpenModal(false)}
        open={openModal}
        title="Đã gửi hướng dẫn"
      >
        <>
          Chúng tôi đã gửi hướng dẫn thay đổi mật khẩu vào <b>{getValues('email')}</b>, vui lòng
          kiếm tra hộp thư cũng như thư rác của bạn.
        </>
      </MDialog>
    </Box>
  );
};
