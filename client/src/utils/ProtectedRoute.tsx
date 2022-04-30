import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppContext } from '../context/useAppContext';
import { addAuth } from '../context/actions';

import { storage } from 'utils';
import { authApi } from 'api/auth.api';

type ProtectedRouteProps = {
  children: React.ReactElement | null;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { dispatch } = useAppContext();

  const token = storage.getToken();
  console.log({ token });
  useEffect(() => {
    const refreshToken = async () => {
      const data = await authApi.getRefreshToken();

      storage.setToken(data.ac_token);

      dispatch(addAuth(data));

      toast.success(`Hi ${storage.getUser().name}, Have a nice day!`, {
        position: 'bottom-right',
      });
    };

    if (!!token) refreshToken();
  }, []);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return children;
};
