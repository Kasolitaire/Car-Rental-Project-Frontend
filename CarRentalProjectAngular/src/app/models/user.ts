export interface User {
  userId?: number;
  userRole?: string;
  fullName: string;
  id: string;
  username: string;
  birthDate?: string;
  gender: string;
  email: string;
  password: string;
  profilePicture?: boolean | null;
}
