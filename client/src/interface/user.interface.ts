export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  role?: string;
  coverPhoto?: string;
  profilePic: string;
  authKey?: string;

  createdAt?: string;
  updatedAt?: string;
}
