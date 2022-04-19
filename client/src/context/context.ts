import { createContext, Dispatch } from 'react';
import { AppActions } from './actionTypes';
import { AppState, initialAppState } from './state';

export const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppActions>;
}>({
  state: initialAppState,
  dispatch: () => undefined,
});
