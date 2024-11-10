export default interface Student {
  id: string;
  fullname: string;
  email: string;
  dob: string;
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
