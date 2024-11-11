import Student, { CreateStudentDTO, UpdateStudentDTO } from '@/types/student';

export default class MockStudentService {
  static async getStudents(page = 1, pageSize = 10) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      students: paginatedData,
      totalItems: data.length ?? 0,
      totalPages: Math.ceil(data.length / pageSize) ?? 1,
      currentPage: page ?? 1,
    };
  }

  static async getStudent(studentId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return data.find((student) => student.id === studentId);
  }

  static async addStudent(student: CreateStudentDTO) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const id = String(data.length + 1);

    const newStudent: Student = { ...student, id };
    data.push(newStudent);

    return newStudent;
  }

  static async updateStudent(studentId: string, studentData: UpdateStudentDTO) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let student = data.find((student) => student.id === studentId);

    if (student) {
      student.fullname = studentData.fullname ?? student.fullname;
      student.dob = studentData.dob ?? student.dob;
    }

    return student;
  }

  static async deleteStudent(studentId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let studentIndex = data.findIndex((student) => student.id === studentId);

    if (studentIndex !== -1) {
      data.splice(studentIndex, 1);
    }
  }
}

let data = [
  {
    id: '1',
    fullname: 'John Doe',
    email: 'test@gmail.com',
    dob: '1990-01-01',
  },
  {
    id: '2',
    fullname: 'Jane Doe',
    email: 'test2@gmail.com',
    dob: '1991-01-01',
  },
  {
    id: '3',
    fullname: 'Alice Smith',
    email: 'alice.smith@gmail.com',
    dob: '1992-02-02',
  },
  {
    id: '4',
    fullname: 'Bob Johnson',
    email: 'bob.johnson@gmail.com',
    dob: '1993-03-03',
  },
  {
    id: '5',
    fullname: 'Charlie Brown',
    email: 'charlie.brown@gmail.com',
    dob: '1994-04-04',
  },
  {
    id: '6',
    fullname: 'David Wilson',
    email: 'david.wilson@gmail.com',
    dob: '1995-05-05',
  },
  {
    id: '7',
    fullname: 'Eva Davis',
    email: 'eva.davis@gmail.com',
    dob: '1996-06-06',
  },
  {
    id: '8',
    fullname: 'Frank Miller',
    email: 'frank.miller@gmail.com',
    dob: '1997-07-07',
  },
  {
    id: '9',
    fullname: 'Grace Lee',
    email: 'grace.lee@gmail.com',
    dob: '1998-08-08',
  },
  {
    id: '10',
    fullname: 'Hannah White',
    email: 'hannah.white@gmail.com',
    dob: '1999-09-09',
  },
  {
    id: '11',
    fullname: 'Ian Green',
    email: 'ian.green@gmail.com',
    dob: '2000-10-10',
  },
  {
    id: '12',
    fullname: 'Jack Black',
    email: 'jack.black@gmail.com',
    dob: '2001-11-11',
  },
];
