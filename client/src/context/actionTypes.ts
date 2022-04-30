import { AuthResponse } from 'interface';

export enum ActionType {
  AddAuth,
  Reset,
}

export interface AddAuth {
  type: ActionType.AddAuth;
  payload: AuthResponse;
}

export interface ResetAppState {
  type: ActionType.Reset;
}

export type AppActions = AddAuth | ResetAppState;
