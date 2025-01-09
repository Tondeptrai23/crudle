using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using _3w1m.Controllers.Admin;
using _3w1m.Services.Interface;
using _3w1m.Dtos.Teacher;
using _3w1m.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TestBackend.Controllers.AdminTests;
[TestClass]
public class AdminTeacherControllerTests
{
    private Mock<ITeacherService> _teacherServiceMock;
    private TeacherController _controller;

    [TestInitialize]
    public void Setup()
    {
        _teacherServiceMock = new Mock<ITeacherService>();
        _controller = new TeacherController(_teacherServiceMock.Object);
    }

    [TestMethod]
    public async Task GetAllTeacher_ReturnsOkResult()
    {
        // Arrange
        var queryDto = new TeacherCollectionQueryDto();
        var teachers = new List<TeacherDto>();
        _teacherServiceMock.Setup(service => service.GetTeachersAsync(queryDto))
            .ReturnsAsync((teachers.Count, teachers));

        // Act
        var result = await _controller.GetAllTeacher(queryDto);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var response = okResult.Value as PaginationResponseDto<IEnumerable<TeacherDto>>;
        Assert.IsNotNull(response);
        Assert.AreEqual(teachers, response.Data);
    }

    [TestMethod]
    public async Task CreateTeacher_ReturnsOkResult()
    {
        // Arrange
        var teacherData = new CreateTeacherRequestDto();
        var createdTeacher = new TeacherDto();
        _teacherServiceMock.Setup(service => service.CreateTeacherAsync(teacherData))
            .ReturnsAsync(createdTeacher);

        // Act
        var result = await _controller.CreateTeacher(teacherData);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var response = okResult.Value as ResponseDto<TeacherDto>;
        Assert.IsNotNull(response);
        Assert.AreEqual(createdTeacher, response.Data);
    }

    [TestMethod]
    public async Task UpdateTeacher_ReturnsOkResult()
    {
        // Arrange
        int teacherId = 1;
        var teacherData = new UpdateTeacherRequestDto();
        var updatedTeacher = new TeacherDto();
        _teacherServiceMock.Setup(service => service.UpdateTeacherAsync(teacherId, teacherData))
            .ReturnsAsync(updatedTeacher);

        // Act
        var result = await _controller.UpdateTeacher(teacherData, teacherId);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var response = okResult.Value as ResponseDto<TeacherDto>;
        Assert.IsNotNull(response);
        Assert.AreEqual(updatedTeacher, response.Data);
    }
}