export default interface Teacher {
  id: string;
  fullname: string;
  contactEmail: string;
  contactPhone: string;
}

export interface TeacherCollectionResponse {
  TeacherId: string;
  Fullname: string;
  ContactEmail: string;
  ContactPhone: string;
  UserId: string;
}

export interface CreateTeacherDTO {
  fullname: string;
  password: string;
  contactEmail: string;
  contactPhone: string;
}

export interface UpdateTeacherDTO {
  fullname?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface TeacherResponse {
  TeacherId: string;
Fullname: string;
}
