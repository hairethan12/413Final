using Final413Hair.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Final413Hair.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainersController : ControllerBase
    {
        private readonly AgencyDbContext _context;

        public EntertainersController(AgencyDbContext context)
        {
            _context = context;
        }

        // GET: api/entertainers
        [HttpGet]
        public async Task<IActionResult> GetEntertainers()
        {
            var entertainers = _context.Entertainers.ToList();
            return Ok(entertainers);
        }

        // GET: api/entertainers/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEntertainer(long id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
                return NotFound();

            return Ok(entertainer);
        }

        // Delete entertainer
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntertainer(long id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null) return NotFound();

            _context.Entertainers.Remove(entertainer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Get for the entertainer list
        [HttpGet("summary")]
        public async Task<IActionResult> GetEntertainerSummaries()
        {
            var summaries = await _context.Entertainers
                .Select(e => new
                {
                    e.EntertainerID,
                    e.EntStageName,
                    TotalEngagements = _context.Engagements.Count(en => en.EntertainerID == e.EntertainerID),
                    LastEngagementDate = _context.Engagements
                        .Where(en => en.EntertainerID == e.EntertainerID)
                        .Max(en => en.StartDate)
                })
                .ToListAsync();

            return Ok(summaries);
        }

        // post for add entertainers
        [HttpPost]
        public async Task<IActionResult> AddEntertainer([FromBody] Entertainer entertainer)
        {
            if (entertainer == null || string.IsNullOrWhiteSpace(entertainer.EntStageName))
            {
                return BadRequest("Stage name is required.");
            }

            _context.Entertainers.Add(entertainer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEntertainer), new { id = entertainer.EntertainerID }, entertainer);
        }

        // put for updating entertainers
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEntertainer(long id, [FromBody] Entertainer updated)
        {
            if (id != updated.EntertainerID) return BadRequest("ID mismatch");

            var existing = await _context.Entertainers.FindAsync(id);
            if (existing == null) return NotFound();

            // Update fields manually
            _context.Entry(existing).CurrentValues.SetValues(updated);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
