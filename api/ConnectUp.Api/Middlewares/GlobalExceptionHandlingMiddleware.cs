using Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace ConnectUp.Api.Middlewares;

public class GlobalExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public GlobalExceptionHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ConnectUpException ex)
        {
            await WriteErrorResponse(context, ex.StatusCode, ex.Message);
        }
        catch(Exception ex)
        {
            await WriteErrorResponse(context, (int)HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    private async Task WriteErrorResponse(HttpContext context, int statusCode, string message)
    {
        ProblemDetails problem = new ProblemDetails()
        {
            Status = statusCode,
            Detail = message
        };

        string json = JsonSerializer.Serialize(problem);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;
        await context.Response.WriteAsync(json);
    }
}

public static class GlobalExceptionHandlingMiddlewareExtensions
{
    public static IApplicationBuilder UseGlobalExceptionHandling(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<GlobalExceptionHandlingMiddleware>();
    }
}