using _3w1m.Controllers;
using _3w1m.Dtos;
using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Student;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TestBackend.Controllers.UserTests;

[TestClass]
public class StudentControllerTests
{
    private readonly Mock<IStudentService> _studentServiceMock;
    private readonly Mock<UserManager<User>> _userManagerMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IAssignmentService> _assignmentServiceMock;
    private readonly Mock<IExamService> _examServiceMock;
    private readonly Mock<IArticleService> _articleServiceMock;
    private readonly StudentController _controller;

    public StudentControllerTests()
    {
        _studentServiceMock = new Mock<IStudentService>();
        _userManagerMock = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
        _mapperMock = new Mock<IMapper>();
        _assignmentServiceMock = new Mock<IAssignmentService>();
        _controller = new StudentController(_userManagerMock.Object, 
            _studentServiceMock.Object,
            _mapperMock.Object,
            _assignmentServiceMock.Object,
            _examServiceMock.Object,
            _articleServiceMock.Object);
    }

    [TestMethod]
    public async Task GetById_ReturnsOkResult_WithStudentDetailDto()
    {
        // Arrange
        var studentId = 1;
        var studentDetailDto = new StudentDetailDto { StudentId = studentId };
        _studentServiceMock.Setup(service => service.GetStudentByIdAsync(studentId)).ReturnsAsync(studentDetailDto);

        // Act
        var result = await _controller.GetById(studentId);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var responseDto = okResult.Value as ResponseDto<StudentDetailDto>;
        Assert.IsNotNull(responseDto);
        Assert.AreEqual(studentDetailDto, responseDto.Data);
    }

    // [TestMethod]
    // public async Task GetUpcomingAssignments_ReturnsOkResult_WithUpcomingAssignments()
    // {
    //     // Arrange
    //     var year = 2023;
    //     var month = 10;
    //     var user = new User { Id = "userId" };
    //     var student = new StudentDto { StudentId = 1 };
    //     var upcomingAssignments = new List<UpcomingAssignmentDto> { new UpcomingAssignmentDto { AssignmentId = 1 } };
    //     _userManagerMock.Setup(manager => manager.GetUserAsync(It.IsAny<System.Security.Claims.ClaimsPrincipal>())).ReturnsAsync(user);
    //     _studentServiceMock.Setup(service => service.GetStudentByUserIdAsync(user.Id)).ReturnsAsync(student);
    //     _assignmentServiceMock.Setup(service => service.GetAssignmentsByStudentId(student.StudentId, year, month + 1)).ReturnsAsync((true, upcomingAssignments));
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
}