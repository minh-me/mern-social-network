import { AuthUserResponse } from '~/interface';

export enum ActionType {
  AddAuth,
  Reset,
  SetLimitPosts,
  SetLimitComments,
  SetLimitUsers,
}

export interface AddAuth {
  type: ActionType.AddAuth;
  payload: AuthUserResponse;
}

export interface ResetAppState {
  type: ActionType.Reset;
}

export type AppActions = AddAuth | ResetAppState;
