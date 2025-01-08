using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using _3w1m.Controllers.Admin;
using _3w1m.Services.Interface;
using _3w1m.Dtos.Student;
using _3w1m.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper.Configuration.Conventions;
using Azure;
using Microsoft.Extensions.FileProviders;
using Microsoft.VisualStudio.TestPlatform.ObjectModel.DataCollection;

namespace TestBackend.Controllers.AdminTests;
[TestClass]
public class AdminStudentControllerTests
{
    private Mock<IStudentService> _studentServiceMock;
    private Mock<IMapper> _mapperMock;
    private StudentController _controller;

    [TestInitialize]
    public void Setup()
    {
        _studentServiceMock = new Mock<IStudentService>();
        _mapperMock = new Mock<IMapper>();
        _controller = new StudentController(_studentServiceMock.Object, _mapperMock.Object);
    }

    [TestMethod]
    public async Task GetStudentsAsync_ReturnsOkResult()
    {
        // Arrange
        var request = new StudentCollectionQueryDto();
        var students = new List<StudentDto>();
        _studentServiceMock.Setup(service => service.GetStudentsAsync(request))
            .ReturnsAsync((students.Count, students));

        // Act
        var result = await _controller.GetStudentsAsync(request);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var response = okResult.Value as PaginationResponseDto<IEnumerable<StudentDto>>;
        Assert.IsNotNull(response);
        Assert.AreEqual(students, response.Data);
    }

    [TestMethod]
    public async Task CreateStudentAsync_ReturnsOkResult()
    {
        // Arrange
        var student = new CreateStudentRequestDto();
        var createdStudent = new StudentDto();
        _studentServiceMock.Setup(service => service.CreateStudentAsync(student))
            .ReturnsAsync(createdStudent);

        // Act
        var result = await _controller.CreateStudentAsync(student);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var response = okResult.Value as ResponseDto<StudentDto>;
        Assert.IsNotNull(response);
        Assert.AreEqual(createdStudent, response.Data);
    }

    [TestMethod]
    public async Task GetStudentByIdAsync_ReturnsOkResult()
    {
        // Arrange
        int studentId = 1;
        var student = new StudentDetailDto();
        _studentServiceMock.Setup(service => service.GetStudentByIdAsync(studentId))
            .ReturnsAsync(student);

        // Act
        var result = await _controller.GetStudentByIdAsync(studentId);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var response = okResult.Value as ResponseDto<StudentDetailDto>;
        Assert.IsNotNull(response);
        Assert.AreEqual(student, response.Data);
    }

    [TestMethod]
    public async Task UpdateStudentAsync_ReturnsOkResult()
    {
        // Arrange
        int studentId = 1;
        var request = new UpdateStudentRequestDto();
        var updatedStudent = new StudentDto();
        _studentServiceMock.Setup(service => service.UpdateStudentAsync(studentId, request))
            .ReturnsAsync(updatedStudent);

        // Act
        var result = await _controller.UpdateStudentAsync(request, studentId);

        // Assert
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var response = okResult.Value as ResponseDto<StudentDto>;
        Assert.IsNotNull(response);
        Assert.AreEqual(updatedStudent, response.Data);
    }
    [TestMethod]
    public async Task GetStudentsAsync_ReturnsNotFoundResult()
    {
        // Arrange
        var request = new StudentCollectionQueryDto();
        _studentServiceMock.Setup(service => service.GetStudentsAsync(request))
            .ReturnsAsync((0, null));
    
        // Act
        var result = await _controller.GetStudentsAsync(request);
    
        // Assert
        var notFoundResult = result as OkObjectResult;
        Assert.IsNotNull(notFoundResult);
        var data = notFoundResult.Value as PaginationResponseDto<IEnumerable<StudentDto>>;
        
        Assert.IsNull(data.Data);
    }
    
    
    [TestMethod]
    public async Task GetStudentByIdAsync_ReturnsNotFoundResult()
    {
        // Arrange
        int studentId = 1;
        _studentServiceMock.Setup(service => service.GetStudentByIdAsync(studentId))
            .ReturnsAsync((StudentDetailDto)null);
    
        // Act
        var result = await _controller.GetStudentByIdAsync(studentId);
    
        // Assert
        var notFoundResult = result as OkObjectResult;
        Assert.IsNotNull(notFoundResult);
        var data = notFoundResult.Value as ResponseDto<StudentDetailDto>;
        
        Assert.IsNull(data.Data);
    }
}