using System.Net;

namespace Exceptions;

[Serializable]
public class NotFoundException : ConnectUpException
{
    public new int StatusCode { get; set; } = (int)HttpStatusCode.NotFound;

    public NotFoundException() { }

    public NotFoundException(string message) : base(message) { }

    public NotFoundException(string message, Exception inner) : base(message, inner) { }
}
