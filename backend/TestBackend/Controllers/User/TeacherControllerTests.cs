using _3w1m.Controllers;
using _3w1m.Dtos;
using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Teacher;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TestBackend.Controllers.UserTests;

[TestClass]
public class TeacherControllerTests
{
    private Mock<ITeacherService> _teacherServiceMock;
    private Mock<IAssignmentService> _assignmentServiceMock;
    private Mock<UserManager<User>> _userManagerMock;
    private TeacherController _controller;

    [TestInitialize]
    public void Setup()
    {
        _teacherServiceMock = new Mock<ITeacherService>();
        _assignmentServiceMock = new Mock<IAssignmentService>();
        _userManagerMock = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
        _controller = new TeacherController(_teacherServiceMock.Object, _assignmentServiceMock.Object, _userManagerMock.Object);
    }

    [TestMethod]
    public async Task GetTeacherById_ReturnsOkResult_WithTeacherDto()
    {
        // Arrange
        var teacherId = 1;
        var teacherDto = new TeacherDetailDto { TeacherId = teacherId };
        _teacherServiceMock.Setup(service => service.GetTeacherByIdAsync(teacherId)).ReturnsAsync(teacherDto);

        // Act
        var result = await _controller.GetTeacherById(teacherId);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var responseDto = okResult.Value as ResponseDto<TeacherDto>;
        Assert.IsNotNull(responseDto);
        Assert.AreEqual(teacherDto, responseDto.Data);
    }

[TestMethod]
    public async Task GetTeacherById_ReturnsNotFound_WhenTeacherNotFound()
    {
        // Arrange
        var teacherId = 1;
        _teacherServiceMock.Setup(service => service.GetTeacherByIdAsync(teacherId)).ReturnsAsync((TeacherDetailDto)null);

        // Act
        var result = await _controller.GetTeacherById(teacherId);

        // Assert
        Assert.IsInstanceOfType(result, typeof(NotFoundResult));
    }

    // TODO: Try another way to mock
    // [TestMethod]
    // public async Task GetUpcomingAssignments_ReturnsOkResult_WithUpcomingAssignments()
    // {
    //     // Arrange
    //     var year = 2023;
    //     var month = 10;
    //     var user = new User { Id = "userId" };
    //     var teacher = new Teacher { TeacherId = 1 };
    //     var upcomingAssignments = new List<UpcomingAssignmentDto> { new UpcomingAssignmentDto { AssignmentId = 1 } };
    //     _userManagerMock.Setup(manager => manager.GetUserAsync(It.IsAny<System.Security.Claims.ClaimsPrincipal>())).ReturnsAsync(user);
    //     _teacherServiceMock.Setup(service => service.GetTeacherByUserIdAsync(user.Id)).ReturnsAsync(teacher);
    //     _assignmentServiceMock.Setup(service => service.GetAssignmentsByTeacherId(teacher.TeacherId, year, month + 1)).ReturnsAsync((true, (IEnumerable<UpcomingAssignmentDto>)upcomingAssignments));
    //
    //     // Act
    //     var result = await _controller.GetUpcomingAssignments(year, month);
    //
    //     // Assert
    //     var okResult = result as OkObjectResult;
    //     Assert.IsNotNull(okResult);
    //     var responseDto = okResult.Value as ResponseDto<IEnumerable<UpcomingAssignmentDto>>;
    //     Assert.IsNotNull(responseDto);
    //     Assert.AreEqual(upcomingAssignments, responseDto.Data);
    // }

    [TestMethod]
    public async Task GetUpcomingAssignments_ReturnsUnauthorized_WhenUserNotFound()
    {
        // Arrange
        var year = 2023;
        var month = 10;
        _userManagerMock.Setup(manager => manager.GetUserAsync(It.IsAny<System.Security.Claims.ClaimsPrincipal>())).ReturnsAsync((User)null);

        // Act
        var result = await _controller.GetUpcomingAssignments(year, month);

        // Assert
        Assert.IsInstanceOfType(result, typeof(UnauthorizedResult));
    }

    [TestMethod]
    public async Task GetUpcomingAssignments_ReturnsNotFound_WhenTeacherNotFound()
    {
        // Arrange
        var year = 2023;
        var month = 10;
        var user = new User { Id = "userId" };
        _userManagerMock.Setup(manager => manager.GetUserAsync(It.IsAny<System.Security.Claims.ClaimsPrincipal>())).ReturnsAsync(user);
        _teacherServiceMock.Setup(service => service.GetTeacherByUserIdAsync(user.Id)).ReturnsAsync((TeacherDto)null);

        // Act
        var result = await _controller.GetUpcomingAssignments(year, month);

        // Assert
        Assert.IsInstanceOfType(result, typeof(UnauthorizedResult));
    }
}