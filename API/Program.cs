using Persistence;
using Serilog;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog
(
    (hostingContext, loggingConfiguration) => 
        loggingConfiguration.ReadFrom.Configuration(hostingContext.Configuration)
);

// Add services to the container.
var configuration = builder.Configuration;
var environment = builder.Environment;

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options => {
    options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using(var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var context = services.GetRequiredService<DataContext>();
        await context.Database.MigrateAsync();
        await Seed.SeedData(context);
    }
    catch(Exception ex)
    {
        Log.Fatal(ex, "An error occured during migration.");
    }
}

try
{
    Log.Information("Starting CookBook.");
    await app.RunAsync();
}
catch(Exception ex)
{
    Log.Fatal(ex, "CookBook terminated unexpectedly.");
}
finally
{
    Log.CloseAndFlush();
}