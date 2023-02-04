using System.ComponentModel;

namespace ConnectUp.Models;

public class BaseModel
{
    public int Id { get; set; }
    public Guid Uuid { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsValid { get; set; }
}
