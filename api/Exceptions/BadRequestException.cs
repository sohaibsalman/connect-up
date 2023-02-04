using System.Net;

namespace Exceptions;

[Serializable]
public class BadRequestException : ConnectUpException
{
    public new int StatusCode { get; set; } = (int)HttpStatusCode.BadRequest;

    public BadRequestException() { }

    public BadRequestException(string message) : base(message) { }

    public BadRequestException(string message, Exception inner) : base(message, inner) { }
}
