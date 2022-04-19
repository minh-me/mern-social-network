import { authApi } from 'api/authApi';
import { addAuth, addUser } from 'context/actions';
import { useAppContext } from 'context/useAppContext';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { storage } from 'utils';
import { handlerError } from 'utils/handleError';

export const useLogin = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  return useMutation(authApi.login, {
    onSuccess: (data) => {
      const { ac_token, user } = data;

      dispatch(addAuth(ac_token));
      dispatch(addUser(user));

      storage.setToken(ac_token);
      storage.setUser(user);

      navigate('/', { replace: true });
    },
    onError: handlerError,
  });
};

export const useRegister = () => {
  return useMutation(authApi.register, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: handlerError,
  });
};

export const useForgotPassword = () => {
  return useMutation(authApi.forgotPassword, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: handlerError,
  });
};

export const useResetPassword = () => {
  const { dispatch } = useAppContext();
  return useMutation(authApi.resetPassword, {
    onSuccess: (data) => {
      const { ac_token, user } = data;

      dispatch(addAuth(ac_token));
      dispatch(addUser(user));

      storage.setToken(ac_token);
      // storage.setUser(user);

      toast.success(`Hi ${data.user.name}, have a nice day!`);
    },
    onError: handlerError,
  });
};
