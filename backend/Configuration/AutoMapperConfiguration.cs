using AutoMapper;
using _3w1m.Mapper;

namespace _3w1m.Configuration;

public static class AutoMapperConfigExtension
{
    public static IServiceCollection AddAutoMapperConfig(this IServiceCollection services)
    {
        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<MappingProfile>();
        });
        services.AddScoped<IMapper>(sp => new AutoMapper.Mapper(config));
        
        return services;
    }
}