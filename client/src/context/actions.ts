import { AuthResponse } from 'interface';
import { ActionType, AddAuth, ResetAppState } from './actionTypes';

export const addAuth = (auth: AuthResponse): AddAuth => {
  return {
    type: ActionType.AddAuth,
    payload: auth,
  };
};

export const resetAppState = (): ResetAppState => {
  return {
    type: ActionType.Reset,
  };
};
