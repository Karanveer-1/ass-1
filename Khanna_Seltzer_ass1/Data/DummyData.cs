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
                new Boat {BoatName="Alpha Centauri",
                    Description ="Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore <em>magna aliqua.</em>",
                    Picture ="/assets/img/boat1.jpeg", Make="Centaurus", LengthInFeet="20"},
                new Boat {BoatName="Proxima Centauri",
                    Description ="Ut enim <em>ad minim veniam</em>, quis nostrud exercitation ullamco laboris nisi <sub>ut</sub> aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate <strong>velit esse cillum</strong> dolore eu fugiat nulla pariatur.",
                    Picture ="/assets/img/boat1.jpeg", Make="Centaurus", LengthInFeet="30"},
                new Boat {BoatName="Kochab", Description="Excepteur sint occaecat cupidatat non proident, <mark>sunt in culpa qui officia</mark> deserunt mollit anim id est laborum.",
                    Picture ="/assets/img/boat1.jpeg", Make="Ursa Minor", LengthInFeet="25"},
                new Boat {BoatName="Callisto",
                    Description ="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae <mark>vitae</mark> dicta sunt explicabo.",
                    Picture ="/assets/img/boat1.jpeg", Make="Jupiter", LengthInFeet="17"},
                new Boat {BoatName="Thuban", Description="Nemo enim ipsam voluptatem <strong>quia voluptas sit aspernatur</strong> aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                    Picture ="/assets/img/boat1.jpeg", Make="Draco", LengthInFeet="5"}
            };
            return boats;
        }
    }
}
