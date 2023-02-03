using System.ComponentModel.DataAnnotations;

namespace ConnectUp.Models;

public class User : BaseModel
{
    [Required]
    public string? Email { get; set; }
    
    [Required]
    public string? Password { get; set; }
}
