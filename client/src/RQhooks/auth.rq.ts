import { authApi } from 'api/auth.api';
import { addAuth, resetAppState } from 'context/actions';
import { useAppContext } from 'hooks/useAppContext';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { storage } from 'utils';
import { handlerError } from 'utils/handleError';

export const useLogin = () => {
  const { dispatch } = useAppContext();
  return useMutation(authApi.login, {
    onSuccess: (data) => {
      dispatch(addAuth(data));
      storage.setToken(data.ac_token);
    },
    onError: handlerError,
  });
};

export const useLoginWithGoogle = () => {
  const { dispatch } = useAppContext();
  return useMutation(authApi.googleLogin, {
    onSuccess: (data) => {
      dispatch(addAuth(data));
      storage.setToken(data.ac_token);
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

export const useActiveAccount = () => {
  return useMutation(authApi.activeAccount, {
    onSuccess: (data) => {
      toast.info(data.message);
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
      dispatch(addAuth(data));
      storage.setToken(data.ac_token);
    },
    onError: handlerError,
  });
};

export const useLogout = () => {
  const { dispatch } = useAppContext();

  return useMutation(authApi.logout, {
    onSuccess: () => {
      dispatch(resetAppState());
      storage.clearToken();
    },
    onError: handlerError,
  });
};
