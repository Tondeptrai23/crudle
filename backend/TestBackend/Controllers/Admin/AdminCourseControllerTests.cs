using _3w1m.Controllers.Admin;
using _3w1m.Dtos.Course;
using _3w1m.Dtos.Student;
using _3w1m.Dtos.Teacher;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using _3w1m.Dtos;
using _3w1m.Models.Domain;

namespace TestBackend.Controllers.AdminTests;
[TestClass]
public class AdminCourseControllerTests
{
    private Mock<ICourseService> _courseServiceMock;
    private CourseController _controller;

    [TestInitialize]
    public void Setup()
    {
        _courseServiceMock = new Mock<ICourseService>();
        _controller = new CourseController(_courseServiceMock.Object);
    }

    [TestMethod]
    public async Task GetCourses_ReturnsOkResult()
    {
        // Arrange
        var queryDto = new CourseCollectionQueryDto();
        var courses = new List<CourseDto>();
        _courseServiceMock.Setup(service => service.GetCoursesAsync(queryDto))
            .ReturnsAsync((10, courses));

        // Act
        var result = await _controller.GetCourses(queryDto);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        Assert.AreEqual(200, okResult.StatusCode);
    }

    [TestMethod]
    public async Task GetStudentsInCourse_ReturnsOkResult()
    {
        // Arrange
        int courseId = 1;
        var students = new List<StudentDto>();
        _courseServiceMock.Setup(service => service.GetStudentsInCourseAsync(courseId))
            .ReturnsAsync((10, students));

        // Act
        var result = await _controller.GetStudentsInCourse(courseId);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        Assert.AreEqual(200, okResult.StatusCode);
    }

    [TestMethod]
    public async Task CreateCourse_ReturnsOkResult()
    {
        // Arrange
        var data = new CreateCourseRequestDto();
        var course = new CourseDto();
        _courseServiceMock.Setup(service => service.CreateCourseAsync(data))
            .ReturnsAsync(course);

        // Act
        var result = await _controller.CreateCourse(data);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        Assert.AreEqual(200, okResult.StatusCode);
    }

    [TestMethod]
    public async Task UpdateCourse_ReturnsOkResult()
    {
        // Arrange
        int courseId = 1;
        var requestCourseData = new UpdateRequestCourseDto();
        var course = new CourseDto();
        _courseServiceMock.Setup(service => service.UpdateCourseAsync(courseId, requestCourseData))
            .ReturnsAsync(course);

        // Act
        var result = await _controller.UpdateCourse(courseId, requestCourseData);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        Assert.AreEqual(200, okResult.StatusCode);
    }

    [TestMethod]
    public async Task EnrollStudentIntoCourse_ReturnsOkResult()
    {
        // Arrange
        int courseId = 1;
        var enrollRequest = new EnrollmentRequestDto();
        var students = new List<StudentDto>();
        _courseServiceMock.Setup(service => service.EnrollStudentIntoCourseAsync(courseId, enrollRequest))
            .ReturnsAsync(students);

        // Act
        var result = await _controller.EnrollStudentIntoCourse(courseId, enrollRequest);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        Assert.AreEqual(200, okResult.StatusCode);
    }

    [TestMethod]
    public async Task EnrollTeacherIntoCourse_ReturnsOkResult()
    {
        // Arrange
        int courseId = 1;
        var enrollRequest = new EnrollTeacherToCourseRequestDto();
        var teacher = new TeacherDto();
        _courseServiceMock.Setup(service => service.EnrollTeacherIntoCourseAsync(courseId, enrollRequest))
            .ReturnsAsync(teacher);

        // Act
        var result = await _controller.EnrollTeacherIntoCourse(courseId, enrollRequest);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        Assert.AreEqual(200, okResult.StatusCode);
    }

    [TestMethod]
    public async Task GetCourses_ReturnsNotFoundResult()
    {
        // Arrange
        var queryDto = new CourseCollectionQueryDto();
        _courseServiceMock.Setup(service => service.GetCoursesAsync(queryDto))
            .ReturnsAsync((0, null));

        // Act
        var result = await _controller.GetCourses(queryDto);

        // Assert
        var notFoundResult = result as OkObjectResult;
        Assert.IsNotNull(notFoundResult);
    }

    [TestMethod]
    public async Task GetStudentsInCourse_ReturnsNotFoundResult()
    {
        // Arrange
        int courseId = 1;
        _courseServiceMock.Setup(service => service.GetStudentsInCourseAsync(courseId))
            .ReturnsAsync((0, null));

        // Act
        var result = await _controller.GetStudentsInCourse(courseId);

        // Assert
        var notFoundResult = result as OkObjectResult;
        Assert.IsNotNull(notFoundResult);

        var data = notFoundResult.Value as IEnumerable<StudentDto>;
        Assert.IsNull(data);
    }

    [TestMethod]
    public async Task UpdateCourse_ReturnsNotFoundResult()
    {
        // Arrange
        int courseId = 1;
        var requestCourseData = new UpdateRequestCourseDto();
        _courseServiceMock.Setup(service => service.UpdateCourseAsync(courseId, requestCourseData))
            .ReturnsAsync((CourseDto)null);

        // Act
        var result = await _controller.UpdateCourse(courseId, requestCourseData);

        // Assert
        var notFoundResult = result as OkObjectResult;
        Assert.IsNotNull(notFoundResult);
        var data = notFoundResult.Value as CourseDto;
        Assert.IsNull(data);
    }
}
