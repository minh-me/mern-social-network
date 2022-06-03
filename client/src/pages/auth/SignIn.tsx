import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useForm, SubmitHandler, ErrorOption } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { pink } from '@mui/material/colors';

import { FormInputText } from '~/components/Common';
import { LoginData } from '~/interface';
import { emailSchema, loginSchema } from '~/validations';
import { MDialog } from '~/components/Common/Modal';
import { useForgotPassword, useLogin } from '~/RQhooks';
import { FacebookLoginButton, GoogleButton } from '~/components/Common/Buttons';
import { styles } from './styles';

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

  const navigate = useNavigate();

  const { mutateAsync: login, isLoading: isLogging } = useLogin();
  const { mutateAsync: forgotPassword, isLoading } = useForgotPassword();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    await login(data);
    navigate('/', { replace: true });
  };

  const [openModal, setOpenModal] = useState(false);
  const handleClickForgotPass = async () => {
    try {
      const email = getValues('email');
      await emailSchema.validate({ email });
      await toast.promise(forgotPassword(email), {
        pending: 'Send mail ...',
      });
      setOpenModal(true);
    } catch (error) {
      setError('email', error as ErrorOption);
    }
  };

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
            <Typography fontSize={12} color={pink[400]}>
              Requesting forgot password...
            </Typography>
          ) : (
            <Button disabled={isLogging} sx={styles.link} onClick={handleClickForgotPass}>
              Forgot your password?
            </Button>
          )}
        </Box>

        <LoadingButton
          loadingIndicator="Logging..."
          loading={isLogging}
          variant="contained"
          fullWidth
          type="submit"
          sx={styles.button}
          disabled={isLoading}
        >
          Đăng Nhập
        </LoadingButton>
      </form>

      <Divider
        sx={{
          mt: 3,
          color: '#EC407A',
          fontSize: 12,
          '&::before,&::after': {
            borderColor: 'rgb(255 255 255 / 12%)',
          },
        }}
      >
        or
      </Divider>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <GoogleButton />
        <FacebookLoginButton />
      </Box>
      <Box my={1}>
        <Typography sx={styles.text} textAlign="center">
          Need an account?
          <Link to="/auth/register">Register</Link>
        </Typography>
      </Box>
      <MDialog
        type="ok"
        position="center"
        onClose={() => setOpenModal(false)}
        open={openModal}
        confirmButton={() => setOpenModal(false)}
        title="Đã gửi hướng dẫn"
      >
        <span>
          Chúng tôi đã gửi hướng dẫn thay đổi mật khẩu vào <b>{getValues('email')}</b>, vui lòng
          kiếm tra hộp thư cũng như thư rác của bạn.
        </span>
      </MDialog>
    </Box>
  );
};
