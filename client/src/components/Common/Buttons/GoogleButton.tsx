import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';
import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginWithGoogle } from 'RQhooks';

const OAUTH_CLIENT_ID = '679275323194-0m8bkvm059v14kcepq57l873v8lm7r37.apps.googleusercontent.com';

type Props = {};

export const GoogleButton = (props: Props) => {
  const { mutateAsync } = useLoginWithGoogle();
  const navigate = useNavigate();

  const onSuccess = async (res: any) => {
    const { email, name, googleId, imageUrl } = res.profileObj;
    await mutateAsync({ email, name, googleId, imageUrl });
    navigate('/', { replace: true });
  };

  const onFailure = (res: any) => {
    toast.error('Login failed');
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: OAUTH_CLIENT_ID,
    isSignedIn: true,
  });

  return (
    <>
      <IconButton sx={{ color: 'white' }} onClick={signIn} aria-label="delete" size="large">
        <img src="assets/icons/icons8-google-28.png" alt="GG" />
      </IconButton>
      <IconButton sx={{ color: 'white' }} onClick={signIn} aria-label="delete" size="large">
        <img src="assets/icons/icons8-facebook-28.png" alt="FB" />
      </IconButton>
    </>
  );
};
