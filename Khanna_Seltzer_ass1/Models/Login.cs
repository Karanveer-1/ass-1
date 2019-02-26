using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Khanna_Seltzer_ass1.Models
{
    public class Login
    {
        [Required]
        public String Username { get; set; }
        [Required]
        public String Password { get; set; }
    }
}
