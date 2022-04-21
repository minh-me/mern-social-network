import { userApi } from 'api/userApi';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { storage } from 'utils';
import { addAuth, addUser } from './actions';
import { useAppContext } from './useAppContext';

type ProtectedRouteProps = {
  isAllowed?: boolean;
  children: React.ReactElement | null;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = storage.getToken();
  const { dispatch } = useAppContext();
  useEffect(() => {
    if (!!token) {
      dispatch(addAuth(token));
      toast.success(`Hi ${storage.getUser().name}, Have a nice day!`, {
        position: 'bottom-right',
      });
      return;
    }
  }, [token, dispatch]);

  useEffect(() => {
    const getProfile = async () => {
      const user = await userApi.getProfile();
      dispatch(addUser(user));
    };
    if (!!token) getProfile();
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return children;
};
