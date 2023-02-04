using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace ConnectUp.Models.DataAnnotations
{
    internal class PasswordAttribute : ValidationAttribute
    {
        public PasswordAttribute() : base() { }

        public override bool IsValid(object? value)
        {
            if (value is null) return false;

            string password = (string)value;
            password = password.Trim();
            base.ErrorMessage = "Password must contain at least one ";

            bool isValid = true;
            if(!password.Any(char.IsUpper))
            {
                isValid = false;
                base.ErrorMessage += "uppercase letter, ";
            }
            if(!password.Any(char.IsLower))
            {
                isValid = false;
                base.ErrorMessage += "lowercase letter, ";
            }
            if (!password.Any(char.IsDigit))
            {
                isValid = false;
                base.ErrorMessage += "digit, ";
            }

            base.ErrorMessage = isValid ? "" : base.ErrorMessage.Trim().Remove(base.ErrorMessage.LastIndexOf(","));
            return isValid;
        }
    }
}
