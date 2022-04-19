import { UserResponse } from 'interface';

export enum ActionType {
  AddAuth,
  AddUser,
}

export interface AddAuth {
  type: ActionType.AddAuth;
  payload: { token: string };
}

export interface AddUser {
  type: ActionType.AddUser;
  payload: UserResponse;
}

export type AppActions = AddAuth | AddUser;
