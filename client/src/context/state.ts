import { AuthResponse } from 'interface';

export interface AppState {
  auth: AuthResponse | null;
}

export const initialAppState: AppState = {
  auth: null,
};
