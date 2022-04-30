import { authApi } from 'api/authApi';
import { userApi } from 'api/userApi';
import { User } from 'interface';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { __String } from 'typescript';
import { client, storage } from 'utils';
import axiosInstance from 'utils/axiosInstance';
import { addAuth, addUser } from './actions';
import { useAppContext } from './useAppContext';

type ProtectedRouteProps = {
  isAllowed?: boolean;
  children: React.ReactElement | null;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const {
    state: { auth },
    dispatch,
  } = useAppContext();

  const token = storage.getToken();
  console.log({ token });
  useEffect(() => {
    const refreshToken = async () => {
      const { ac_token } = await authApi.getRefreshToken();
      storage.setToken(ac_token);

      dispatch(addAuth(ac_token));
      toast.success(`Hi ${storage.getUser().name}, Have a nice day!`, {
        position: 'bottom-right',
      });
    };

    if (!!token) refreshToken();
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      const user: User = await userApi.getProfile();
      dispatch(addUser(user));
    };
    console.log({ auth_token: auth.token });
    if (!!auth.token) {
      getProfile();
    }
  }, [auth.token, dispatch]);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return children;
};
