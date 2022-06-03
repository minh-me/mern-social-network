import { AuthUserResponse } from '~/interface';
import { ActionType, AddAuth, ResetAppState } from './actionTypes';

export const addAuth = (auth: AuthUserResponse): AddAuth => {
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
