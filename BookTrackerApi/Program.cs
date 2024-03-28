using Microsoft.EntityFrameworkCore;
using BookTrackerApi.Data;
using Swashbuckle.AspNetCore.SwaggerGen;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowSpecificOrigin",
                      builder =>
                      {
                          builder.WithOrigins("http://example.com") // Specify the allowed origin
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
                      });
});

// Add localization services to the services container
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[] { "en-US", "es-ES", "fr-FR" }; // Add other cultures you want to support
    options.SetDefaultCulture(supportedCultures[0])
           .AddSupportedCultures(supportedCultures)
           .AddSupportedUICultures(supportedCultures);
});

// Register the DbContext with dependency injection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Define any HTTP API endpoints here
// app.MapGet("/api/endpoint", (context) => { /* ... */ });

app.UseCors("AllowSpecificOrigin"); // Use the CORS policy

app.UseRequestLocalization();
// ... other middleware like app.UseRouting(), app.UseEndpoints(), etc.

app.Run();