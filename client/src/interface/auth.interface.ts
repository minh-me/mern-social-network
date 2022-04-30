import { User } from './user.interface';

export interface LoginData {
  email: string;
  password: string;
}

export interface GoogleLoginData {
  email: string;
  googleId: string;
  imageUrl?: string;
  name: string;
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

export interface AuthResponse {
  ac_token: string;
  user: {
    id: string;
    name: string;
    role: string;
    email: string;
    profilePic: string;
  };
}

export interface AccessToken {
  ac_token: string;
}
