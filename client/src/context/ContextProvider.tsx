import { FC, useReducer } from 'react';
import { AppContext } from './context';
import { appReducer } from './reducer';
import { initialAppState } from './state';

type ProviderProps = {
  children: JSX.Element[] | JSX.Element;
};

export const AppContextProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
