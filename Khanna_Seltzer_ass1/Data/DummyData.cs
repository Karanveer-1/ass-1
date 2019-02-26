using Khanna_Seltzer_ass1.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Khanna_Seltzer_ass1.Data
{
    public class DummyData
    {
        public static async Task Initialize(ApplicationDbContext context,
                                            UserManager<ApplicationUser> userManager,
                                            RoleManager<IdentityRole> roleManager)
        {
            context.Database.EnsureCreated();

            if (context.Boat.Any()) { return; }

            var boats = DummyData.GetBoats().ToArray();
            context.Boat.AddRange(boats);
            context.SaveChanges();

            String adminId = "";
            String memberId = "";

            string role1 = "Admin";
            string role2 = "Member";
            string password = "P@$$w0rd";

            if (await roleManager.FindByNameAsync(role1) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(role1));
            }
            if (await roleManager.FindByNameAsync(role2) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(role2));
            }

            if (await userManager.FindByNameAsync("a@a.a") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "a",
                    Email = "a@a.a",
                    FirstName = "Adam",
                    LastName = "Aldridge",
                    Country = "Canada",
                    PhoneNumber = "6902341234"
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role1);
                }
                adminId = user.Id;
            }

            if (await userManager.FindByNameAsync("m@m.m") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "m",
                    Email = "m@m.m",
                    FirstName = "Bob",
                    LastName = "Barker",
                    Country = "Canada",
                    PhoneNumber = "7788951456"
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role2);
                }
                memberId = user.Id;
            }
        }

        public static List<Boat> GetBoats()
        {
            List<Boat> boats = new List<Boat>() {
                new Boat {BoatName="Boat1", Description="Desc", Picture="Pic", Make="make1", LengthInFeet="1"},
                new Boat {BoatName="Boat2", Description="Desc", Picture="Pic", Make="make2", LengthInFeet="2"},
                new Boat {BoatName="Boat3", Description="Desc", Picture="Pic", Make="make3", LengthInFeet="3"},
                new Boat {BoatName="Boat4", Description="Desc", Picture="Pic", Make="make4", LengthInFeet="4"},
                new Boat {BoatName="Boat5", Description="Desc", Picture="Pic", Make="make5", LengthInFeet="5"}
            };
            return boats;
        }
    }
}
