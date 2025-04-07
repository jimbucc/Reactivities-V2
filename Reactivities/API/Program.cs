using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// This is where we add middleware
if (app.Environment.IsDevelopment())
{

}

app.MapControllers();

// Use code to create the database and seed the data
using var scope = app.Services.CreateScope();  // scope gets removed once it goes out of scope
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<AppDbContext>();  // get the AppDbContext service
    await context.Database.MigrateAsync();   // do the migration
    await DbInitializer.SeedData(context);   // seed the data
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
    throw;
}

app.Run();
