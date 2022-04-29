import { User } from 'interface';

export interface AppState {
  auth: { token: string | null };
  user: User | null;
}

export const initialAppState: AppState = {
  auth: { token: '' },
  user: null,
};
