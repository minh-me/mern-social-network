import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormInputText, FormInputDate } from 'components/Common';

interface IFormSignUpData {
  email: string;
  name: string;
  password: string;
  dateOfBirth: Date | null;
}

const registerSchema = yup
  .object({
    email: yup.string().email().required().label('Email'),
    name: yup.string().required().label('Name'),
    password: yup.string().required().label('Password'),
    dateOfBirth: yup.date().required().label('Date Of Birth'),
  })
  .required();

const defaultValues = {
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

  const onSubmit: SubmitHandler<IFormSignUpData> = (data) => console.log({ data });

  return (
    <Box sx={{ background: '#36393f', borderRadius: 2, p: 4, color: 'white' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Typography variant="h5" fontWeight="600" component="h3" align="center">
            Tạo tài khoản
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
            Email
          </Typography>
          <FormInputText name="email" autoFocus={true} control={control} />
        </Box>

        <Box mb={3}>
          <Typography
            fontWeight="500"
            component="label"
            color="#b9bbbe"
            fontSize="small"
            textTransform="uppercase"
          >
            Tên tài khoản
          </Typography>
          <FormInputText name="name" control={control} />
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
          <FormInputText name="password" type="password" control={control} />
        </Box>

        <Box mb={3}>
          <Typography
            fontWeight="500"
            component="label"
            color="#b9bbbe"
            fontSize="small"
            textTransform="uppercase"
          >
            Ngày sinh
          </Typography>
          <FormInputDate name="dateOfBirth" control={control} />
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
          Đăng Ký
        </Button>

        <Box my={2}>
          <Typography
            sx={{
              a: {
                color: pink[400],
                textDecoration: 'none',
                marginLeft: 1,
              },
              '&:hover a': {
                textDecoration: 'underline',
                color: pink[500],
              },
            }}
            color="#72767D"
            fontSize={12}
          >
            <Link to="/login"> Already have an account?</Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};
