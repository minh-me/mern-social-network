import { IconButton } from '@mui/material';
import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useLoginWithGoogle } from '~/RQhooks';

const OAUTH_CLIENT_ID = '679275323194-0m8bkvm059v14kcepq57l873v8lm7r37.apps.googleusercontent.com';

export const GoogleButton = () => {
  const { mutateAsync } = useLoginWithGoogle();
  const navigate = useNavigate();

  const onSuccess = async (res: any) => {
    const { email, name, googleId, imageUrl } = res.profileObj;
    await mutateAsync({ email, name, googleId, imageUrl });
    navigate('/', { replace: true });
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId: OAUTH_CLIENT_ID,
    isSignedIn: false,
    autoLoad: false,
  });

  return (
    <>
      <IconButton sx={{ color: 'white' }} onClick={signIn} aria-label="delete" size="large">
        <img src="assets/icons/icons8-google-28.png" alt="GG" />
      </IconButton>
    </>
  );
};
