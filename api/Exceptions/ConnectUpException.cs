using System.Net;

namespace Exceptions;

[Serializable]
public abstract class ConnectUpException : Exception
{
    public int StatusCode { get; set; } = (int)HttpStatusCode.BadRequest;

	public ConnectUpException() { }

    public ConnectUpException(string message) : base(message) { }

    public ConnectUpException(string message, Exception inner) : base(message, inner) { }
}