using System.Text.Json.Serialization;
using _3w1m.Configuration;
using _3w1m.Data;
using _3w1m.Mapper;
using _3w1m.Middlewares;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Implementation;
using _3w1m.Services.Interface;
using _3w1m.Settings;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

//Configure connection string from environment variable
DotNetEnv.Env.Load();
var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
var database = Environment.GetEnvironmentVariable("DATABASE");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    switch (database)
    {
        case "SQLSERVER":
            options.UseSqlServer(connectionString);
            break;
        case "MYSQL":
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            break;
    }
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
        options.JsonSerializerOptions.WriteIndented = true;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    })
    .AddCustomBadRequest(); // Configure custom BadRequest response

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option=>
{
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "JWT Authentication",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        

        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    option.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { jwtSecurityScheme, Array.Empty<string>() }
    });
});

// Add services to the container.
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<ITeacherService, TeacherService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddSingleton(new JwtSettings().ReadFromEnvironment());

// Configure Identity
builder.Services.AddIdentity<User, IdentityRole>(options =>
    {
        // Turn off password requirements
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 1;
        options.Password.RequiredUniqueChars = 0;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders()
    .AddSignInManager<SignInManager<User>>();


builder.Services.AddAuthenticationConfig();
builder.Services.AddAuthorization();


// Configure AutoMapper
var config = new MapperConfiguration(cfg =>
{
    cfg.AddProfile<MappingProfile>();
});
builder.Services.AddScoped<IMapper>(sp => new Mapper(config));


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add middleware to handle exceptions (ExceptionHandlingMiddleware)

app.UseHttpsRedirection();
app.UseRouting();
app.UseExceptionHandlingMiddleware();
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();



app.Run();