import { UserResponse } from './user.interface';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  dateOfBirth: Date | null;
}
export interface PasswordData {
  password: string;
}

export interface LoginResponse {
  ac_token: string;
  user: UserResponse;
}

export interface AccessToken {
  ac_token: string;
}
