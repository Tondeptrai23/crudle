export interface UserResponse {
  UserId: string;
  Email: string;
}

export interface ProfileData {
  id: string;
  fullname: string;
  dob?: string;
  userId?: string;
  role: string;
  email: string;
}
