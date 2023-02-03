namespace ConnectUp.Models.Dtos.User;

public class UserDto
{
    public Guid Uuid { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
}
