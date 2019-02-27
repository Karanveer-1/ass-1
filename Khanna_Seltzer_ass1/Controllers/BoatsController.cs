using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Khanna_Seltzer_ass1.Data;
using Khanna_Seltzer_ass1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace Khanna_Seltzer_ass1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AuthPolicy")]
    public class BoatsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BoatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Boats
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Boat>>> GetBoat()
        {
            return await _context.Boat.ToListAsync();
        }

        // GET: api/Boats/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Boat>> GetBoat(int id)
        {
            var boat = await _context.Boat.FindAsync(id);

            if (boat == null)
            {
                return NotFound();
            }

            return boat;
        }

        // PUT: api/Boats/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutBoat(int id, Boat boat)
        {
            if (id != boat.BoatId)
            {
                return BadRequest();
            }

            _context.Entry(boat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BoatExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Boats
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Boat>> PostBoat(Boat boat)
        {
            _context.Boat.Add(boat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBoat", new { id = boat.BoatId }, boat);
        }

        // DELETE: api/Boats/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Boat>> DeleteBoat(int id)
        {
            var boat = await _context.Boat.FindAsync(id);
            if (boat == null)
            {
                return NotFound();
            }

            _context.Boat.Remove(boat);
            await _context.SaveChangesAsync();

            return boat;
        }

        private bool BoatExists(int id)
        {
            return _context.Boat.Any(e => e.BoatId == id);
        }
    }
}
