﻿namespace ConnectUp.Models;

public class User : BaseModel
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}
