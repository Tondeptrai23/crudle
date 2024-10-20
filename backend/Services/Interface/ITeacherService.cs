using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _3w1m.Dtos.Teacher;

namespace _3w1m.Services.Interface;
public interface ITeacherService
{
    Task<TeacherDetailDto> GetTeacherByIdAsync(int teacherId);
    Task<(int count, IEnumerable<TeacherDto> teachers)> GetTeachersAsync(TeacherCollectionQueryDto queryDto);
    Task<TeacherDto> CreateTeacherAsync(CreateTeacherRequestDto teacherData);
    Task<TeacherDto> UpdateTeacherAsync(int teacherId, UpdateTeacherRequestDto teacherData);
}
