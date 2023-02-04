using Isopoh.Cryptography.Argon2;
using System.Security.Cryptography;
using System.Text;

namespace ConnectUp.Service.Helpers
{
    public class PasswordManager
    {
        public static string HashPassword(string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(64);
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            Argon2Config config = new Argon2Config { Password = passwordBytes, Salt = salt };

            string hash = Argon2.Hash(config);
            return $"{hash}.{Convert.ToHexString(salt)}";
        }

        public static bool Verify(string storedPassword, string suppliedPassword)
        {
            string[] splittedHash = storedPassword.Split(".");

            byte[] saltBytes = Encoding.UTF8.GetBytes(splittedHash[1]);
            byte[] suppliedPasswordBytes = Encoding.UTF8.GetBytes(suppliedPassword);

            Argon2Config config = new Argon2Config { Password = suppliedPasswordBytes, Salt = saltBytes };
            return Argon2.Verify(splittedHash[0], config);
        }
    }
}
