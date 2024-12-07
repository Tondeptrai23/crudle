export default interface Student {
  id: string;
  fullname: string;
  userId: string;
  dob: string;
  email: string;
}

export interface StudentCollectionResponse {
  StudentId: string;
  Fullname: string;
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
