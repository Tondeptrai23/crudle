using _3w1m.Configuration;
using _3w1m.Middlewares;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

builder.Services.AddSwaggerGen(opt =>
{
    opt.MapType<DateOnly>(() => new OpenApiSchema { Type = "string", Format = "date" });
});

builder.Services.AddDatabaseConfig()
    .AddSwaggerConfig()
    .AddApiConfig()
    .AddApplicationServices()
    .AddIdentityConfig()
    .AddAutoMapperConfig()
    .AddAuthenticationConfig();

builder.Services.AddAuthorization();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseExceptionHandlingMiddleware(); // Custom middleware

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();