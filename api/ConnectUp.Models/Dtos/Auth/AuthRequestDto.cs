using ConnectUp.Models.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace ConnectUp.Models.Dtos.Auth;

public class AuthRequestDto
{
    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    [Password, MinLength(8)]
    public string? Password { get; set; }
}
