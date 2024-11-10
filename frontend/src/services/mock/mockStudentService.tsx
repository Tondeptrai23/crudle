import Student, { CreateStudentDTO, UpdateSudentDTO } from '@/types/student';

var data = [
  {
    id: 1,
    fullname: 'John Doe',
    email: 'test@gmail.com',
    dob: '1990-01-01',
  },
  {
    id: 2,
    fullname: 'Jane Doe',
    email: 'test2@gmail.com',
    dob: '1991-01-01',
  },
];

export default class MockStudentService {
  static async getStudents() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return data;
  }

  static async getStudent(studentId: number | string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return data.find((student) => student.id === studentId);
  }

  static async addStudent(student: CreateStudentDTO) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const id = data.length + 1;

    const newStudent: Student = { ...student, id };
    data.push(newStudent);

    return newStudent;
  }

  static async updateStudent(
    studentId: number | string,
    studentData: UpdateSudentDTO,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let student = data.find((student) => student.id === studentId);

    if (student) {
      student.fullname = studentData.fullname;
      student.dob = studentData.dob;
    }

    return student;
  }

  static async deleteStudent(studentId: number | string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let studentIndex = data.findIndex((student) => student.id === studentId);

    if (studentIndex !== -1) {
      data.splice(studentIndex, 1);
    }
  }
}
