import { AuthUserResponse } from 'interface';

export enum ActionType {
  AddAuth,
  Reset,
}

export interface AddAuth {
  type: ActionType.AddAuth;
  payload: AuthUserResponse;
}

export interface ResetAppState {
  type: ActionType.Reset;
}

export type AppActions = AddAuth | ResetAppState;
