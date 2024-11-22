import ITeacherService from '@/services/interfaces/ITeacherService';
import { ApiResponse } from '@/types/paginationApiResponse';
import Teacher, { CreateTeacherDTO, UpdateTeacherDTO } from '@/types/teacher';

export default class MockTeacherService implements ITeacherService {
  async getTeachers(
    page = 1,
    pageSize = 10,
    search = '',
  ): Promise<ApiResponse<Teacher>> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    if (search) {
      const filteredData = data.filter((teacher) =>
        teacher.fullname.toLowerCase().includes(search.toLowerCase()),
      );
      return {
        data: filteredData,
        totalItems: filteredData.length,
        totalPages: Math.ceil(filteredData.length / pageSize),
        currentPage: page,
      };
    }

    return {
      data: paginatedData,
      totalItems: data.length ?? 0,
      totalPages: Math.ceil(data.length / pageSize) ?? 1,
      currentPage: page ?? 1,
    };
  }

  async getTeacher(teacherId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data.find((teacher) => teacher.id === teacherId);
  }

  async addTeacher(teacher: CreateTeacherDTO) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const id = String(data.length + 1);

    const newTeacher: Teacher = {
      ...teacher,
      id,
    };
    data.push(newTeacher);

    return newTeacher;
  }

  async updateTeacher(teacherId: string, teacherData: UpdateTeacherDTO) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let teacher = data.find((teacher) => teacher.id === teacherId);

    if (teacher) {
      teacher.fullname = teacherData.fullname ?? teacher.fullname;
      teacher.contactEmail = teacherData.contactEmail ?? teacher.contactEmail;
      teacher.contactPhone = teacherData.contactPhone ?? teacher.contactPhone;
    }

    return teacher;
  }

  async deleteTeacher(teacherId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let teacherIndex = data.findIndex((teacher) => teacher.id === teacherId);

    if (teacherIndex !== -1) {
      data.splice(teacherIndex, 1);
    }
  }
}

let data: Teacher[] = [
  {
    id: '1',
    fullname: 'Dr. Sarah Johnson',
    contactEmail: 'sarah.johnson@school.edu',
    contactPhone: '555-0101',
  },
  {
    id: '2',
    fullname: 'Prof. Michael Chen',
    contactEmail: 'michael.chen@school.edu',
    contactPhone: '555-0102',
  },
  {
    id: '3',
    fullname: 'Dr. Emily Davis',
    contactEmail: 'emily.davis@school.edu',
    contactPhone: '555-0103',
  },
  {
    id: '4',
    fullname: 'Prof. James Smith',
    contactEmail: 'james.smith@school.edu',
    contactPhone: '555-0104',
  },
  {
    id: '5',
    fullname: 'Dr. Linda Brown',
    contactEmail: 'linda.brown@school.edu',
    contactPhone: '555-0105',
  },
  {
    id: '6',
    fullname: 'Prof. Robert Wilson',
    contactEmail: 'robert.wilson@school.edu',
    contactPhone: '555-0106',
  },
  {
    id: '7',
    fullname: 'Dr. Patricia Taylor',
    contactEmail: 'patricia.taylor@school.edu',
    contactPhone: '555-0107',
  },
  {
    id: '8',
    fullname: 'Prof. John Anderson',
    contactEmail: 'john.anderson@school.edu',
    contactPhone: '555-0108',
  },
  {
    id: '9',
    fullname: 'Dr. Barbara Martinez',
    contactEmail: 'barbara.martinez@school.edu',
    contactPhone: '555-0109',
  },
  {
    id: '10',
    fullname: 'Prof. William Thomas',
    contactEmail: 'william.thomas@school.edu',
    contactPhone: '555-0110',
  },
  {
    id: '11',
    fullname: 'Dr. Elizabeth Jackson',
    contactEmail: 'elizabeth.jackson@school.edu',
    contactPhone: '555-0111',
  },
  {
    id: '12',
    fullname: 'Prof. Christopher White',
    contactEmail: 'christopher.white@school.edu',
    contactPhone: '555-0112',
  },
];
