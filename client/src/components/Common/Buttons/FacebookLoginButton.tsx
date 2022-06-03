import FacebookLogin from 'react-facebook-login';
// import { useNavigate } from 'react-router-dom';
// import { useLoginWithGoogle } from '~/RQhooks';

const FB_APP_ID = '726027201729735';

export const FacebookLoginButton = () => {
  // const { mutateAsync } = useLoginWithGoogle();
  // const navigate = useNavigate();

  const response = (res: any) => {
    console.log({ res });
  };

  return (
    <>
      <FacebookLogin
        appId={FB_APP_ID}
        fields="name,email,picture"
        autoLoad={false}
        icon={<img src="assets/icons/icons8-facebook-28.png" alt="FB" />}
        textButton=""
        cssClass="fb-btn"
        scope="public_profile,user_friends,user_actions.books"
        callback={response}
      />
    </>
  );
};
