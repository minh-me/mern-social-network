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
