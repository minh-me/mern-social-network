import { Box, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormInputText } from 'components/Common';
import { passwordSchema } from 'validations';
import { PasswordData } from 'interface';
import { styles } from './styles';

const defaultValues: PasswordData = {
  password: '',
};

export const ResetPassword = () => {
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit: SubmitHandler<PasswordData> = (data) => console.log({ data });

  return (
    <Box sx={{ background: '#36393f', borderRadius: 2, p: 4, color: 'white' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Typography variant="h5" fontWeight="600" component="h3" align="center">
            Reset Password
          </Typography>
        </Box>

        <Box mb={3}>
          <FormInputText
            label="Password"
            name="password"
            autoFocus={true}
            type="password"
            control={control}
          />
        </Box>

        <Button variant="contained" fullWidth type="submit" sx={styles.button}>
          Reset
        </Button>
      </form>
    </Box>
  );
};
