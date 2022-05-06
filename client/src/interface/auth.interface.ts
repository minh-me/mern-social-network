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

export interface AuthUserResponse {
  id: string;
  name: string;
  role: string;
  username: string;
  profilePic: {
    url: string;
  };
}

export interface AuthResponse {
  ac_token: string;
  user: AuthUserResponse;
}

export interface AccessToken {
  ac_token: string;
}
