import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler, ErrorOption } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInputText } from 'components/Common';
import { LoginData } from 'interface';
import { styles } from './styles';
import { emailSchema, loginSchema } from 'validations';
import { useState } from 'react';

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

  const onSubmit: SubmitHandler<LoginData> = (data) => console.log({ data });

  const [openModal, setOpenModal] = useState(false);
  const handleClickForgotPass = async () => {
    try {
      const email = getValues('email');
      await emailSchema.validate({ email });
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
          <Typography sx={styles.link} onClick={handleClickForgotPass}>
            Forgot your password?
          </Typography>
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
      <Dialog maxWidth="xs" open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle sx={{ background: '#36393f', color: 'white' }}>Đã gửi hướng dẫn</DialogTitle>
        <DialogContent sx={{ background: '#36393f' }}>
          <DialogContentText sx={{ color: '#DCDDDE', fontWeight: 400, fontSize: 14 }}>
            Chúng tôi đã gửi hướng dẫn thay đổi mật khẩu vào <b>{getValues('email')}</b>, vui lòng
            kiếm tra hộp thư cũng như thư rác của bạn.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: '#2f3136' }}>
          <Button
            sx={styles.button}
            variant="contained"
            onClick={() => setOpenModal(false)}
            autoFocus
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
