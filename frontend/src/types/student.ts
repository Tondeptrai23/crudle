export default interface Student {
  id: number;
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
