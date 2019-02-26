using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Khanna_Seltzer_ass1.Models
{
    public class Register
    {
        [Required]
        public String Username { get; set; }
        [Required]
        [EmailAddress]
        public String Email { get; set; }
        [Required]
        public String Password { get; set; }
        [Required]
        public String FirstName { get; set; }
        [Required]
        public String LastName { get; set; }
        [Required]
        public String Country { get; set; }
        [Required]
        public String PhoneNumber { get; set; }
    }
}
