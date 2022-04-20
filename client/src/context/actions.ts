import { UserResponse } from 'interface';
import { ActionType, AddAuth, AddUser, ResetAppState } from './actionTypes';

export const addAuth = (token: string): AddAuth => {
  return {
    type: ActionType.AddAuth,
    payload: { token },
  };
};

export const addUser = (user: UserResponse): AddUser => {
  return {
    type: ActionType.AddUser,
    payload: user,
  };
};

export const resetAppState = (): ResetAppState => {
  return {
    type: ActionType.Reset,
  };
};
