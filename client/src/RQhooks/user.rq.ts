import { authApi } from 'api/authApi';
import { userApi } from 'api/userApi';
import { addAuth, addUser } from 'context/actions';
import { useAppContext } from 'context/useAppContext';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { storage } from 'utils';
import { handlerError } from 'utils/handleError';

export const useGetPofile = () => {
  return useQuery('profile', userApi.getProfile);
};
