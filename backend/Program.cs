using _3w1m.Configuration;
using _3w1m.Middlewares;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

builder.Services.AddDatabaseConfig()
    .AddSwaggerConfig()
    .AddApiConfig()
    .AddApplicationServices()
    .AddIdentityConfig()
    .AddAutoMapperConfig()
    .AddAuthenticationConfig();

builder.Services.AddAuthorization();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});



var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

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