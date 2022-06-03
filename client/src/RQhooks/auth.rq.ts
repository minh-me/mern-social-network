import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { authApi } from '~/api/auth.api';
import { addAuth } from '~/context/actions';
import { useAuthContext } from '~/hooks/useAppContext';
import { storage } from '~/utils';
import { handlerError } from '~/utils/handleError';

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  return useMutation(authApi.login, {
    onSuccess: (data) => {
      dispatch(addAuth(data.user));
      storage.setToken(data.ac_token);
    },
    onError: handlerError,
  });
};

export const useLoginWithGoogle = () => {
  const { dispatch } = useAuthContext();
  return useMutation(authApi.googleLogin, {
    onSuccess: (data) => {
      dispatch(addAuth(data.user));
      storage.setToken(data.ac_token);
    },
    onError: handlerError,
  });
};

export const useRegister = () => {
  return useMutation(authApi.register, {
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
    onError: handlerError,
  });
};

export const useResetPassword = () => {
  const { dispatch } = useAuthContext();
  return useMutation(authApi.resetPassword, {
    onSuccess: (data) => {
      dispatch(addAuth(data.user));
      storage.setToken(data.ac_token);
    },
    onError: handlerError,
  });
};

export const useLogout = () => {
  return useMutation(authApi.logout, {
    onSuccess: () => {},
    onError: handlerError,
  });
};
