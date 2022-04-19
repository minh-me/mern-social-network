import { UserResponse } from 'interface';

export interface AppState {
  auth: { token: string | null };
  user: UserResponse | null;
}

export const initialAppState: AppState = {
  auth: { token: '' },
  user: null,
};
