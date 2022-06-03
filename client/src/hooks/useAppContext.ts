import { useContext } from 'react';
import { AppContext } from '~/context';

export const useAppContext = () => {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
};

export const useAuthContext = () => {
  const { state, dispatch } = useAppContext();

  const { auth } = state;

  return { auth, dispatch };
};
