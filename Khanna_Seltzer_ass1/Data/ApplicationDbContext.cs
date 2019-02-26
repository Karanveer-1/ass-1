using Khanna_Seltzer_ass1.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Khanna_Seltzer_ass1.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, String>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Boat> Boat { get; set; }
    }
}
