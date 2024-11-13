import IStudentService from '@/services/interfaces/IStudentService';
import { ApiResponse } from '@/types/paginationApiResponse';
import Student, { CreateStudentDTO, UpdateStudentDTO } from '@/types/student';

export default class MockStudentService implements IStudentService {
  async getStudents(
    page = 1,
    pageSize = 10,
    search = '',
  ): Promise<ApiResponse<Student>> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    let filteredData = paginatedData;

    if (search) {
      filteredData = data.filter((student) =>
        student.fullname.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return {
      data: filteredData,
      totalItems: data.length,
      totalPages: Math.ceil(data.length / pageSize),
      currentPage: page,
    };
  }

  async getStudentsWithFilters(
    page = 1,
    pageSize = 10,
    searchByName = '',
    filterByEmailDomain: string[] = [],
    rangeFilterByYear = [0, 0],
    sort: [string | null, 'asc' | 'desc'] = ['fullname', 'asc'],
  ): Promise<ApiResponse<Student>> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let filteredData = data;

    if (searchByName) {
      filteredData = filteredData.filter((student) =>
        student.fullname.toLowerCase().includes(searchByName.toLowerCase()),
      );
    }

    if (filterByEmailDomain.length) {
      filteredData = filteredData.filter((student) => {
        return filterByEmailDomain.some((domain) =>
          student.email.includes(domain),
        );
      });
    }

    if (rangeFilterByYear[0] && rangeFilterByYear[1]) {
      filteredData = filteredData.filter(
        (student) =>
          new Date(student.dob).getFullYear() >= rangeFilterByYear[0] &&
          new Date(student.dob).getFullYear() <= rangeFilterByYear[1],
      );
    }

    if (sort[0] !== '' && sort[1]) {
      filteredData = filteredData.sort((a, b) => {
        const key = sort[0] as keyof Student;

        if (sort[1] === 'asc') {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      totalItems: filteredData.length,
      totalPages: Math.ceil(filteredData.length / pageSize),
      currentPage: page,
    };
  }

  async getStudent(studentId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return data.find((student) => student.id === studentId);
  }

  async addStudent(student: CreateStudentDTO) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const id = String(data.length + 1);

    const newStudent: Student = { ...student, id };
    data.push(newStudent);

    return newStudent;
  }

  async updateStudent(studentId: string, studentData: UpdateStudentDTO) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let student = data.find((student) => student.id === studentId);

    if (student) {
      student.fullname = studentData.fullname ?? student.fullname;
      student.dob = studentData.dob ?? student.dob;
    }

    return student;
  }

  async deleteStudent(studentId: string) {
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
    email: 'john.doe@gmail.com',
    dob: '1990-01-01',
  },
  {
    id: '2',
    fullname: 'Jane Doe',
    email: 'jane.doe@gmail.com',
    dob: '1991-01-01',
  },
  {
    id: '3',
    fullname: 'Alice Smith',
    email: 'alice.smith@facebook.com',
    dob: '1992-02-02',
  },
  {
    id: '4',
    fullname: 'Bob Johnson',
    email: 'bob.johnson@facebook.com',
    dob: '1993-03-03',
  },
  {
    id: '5',
    fullname: 'Charlie Brown',
    email: 'charlie.brown@outlook.com',
    dob: '1994-04-04',
  },
  {
    id: '6',
    fullname: 'David Wilson',
    email: 'david.wilson@outlook.com',
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
