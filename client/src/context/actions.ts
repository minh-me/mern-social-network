import { UserResponse } from 'interface';
import { ActionType, AddAuth, AddUser } from './actionTypes';

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
