import { AuthUserResponse } from '~/interface';

export interface AppState {
  auth: AuthUserResponse | null;
}

export const initialAppState: AppState = {
  auth: null,
};
