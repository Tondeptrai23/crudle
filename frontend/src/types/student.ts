export default interface Student {
  id: string;
  fullname: string;
  userId: string;
  dob: string;
  email: string;
}

export interface StudentResponse {
  StudentId: string;
  Fullname: string;
  Email: string;
  DateOfBirth: string;
  UserId: string;
}

export interface CreateStudentDTO {
  fullname: string;
  password: string;
  email: string;
  dob: string;
}

export interface UpdateStudentDTO {
  fullname?: string;
  dob?: string;
}
