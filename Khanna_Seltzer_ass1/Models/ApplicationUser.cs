using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Khanna_Seltzer_ass1.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() : base() { }

        public String FirstName { get; set; } 
        public String LastName { get; set; }
        public String Country { get; set; }
    }
}
