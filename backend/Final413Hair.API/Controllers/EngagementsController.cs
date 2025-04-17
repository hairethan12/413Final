using Final413Hair.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Final413Hair.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EngagementsController : ControllerBase
    {
        private readonly AgencyDbContext _context;

        public EngagementsController(AgencyDbContext context)
        {
            _context = context;
        }

        // grabs engagements with entertainers
        // GET: api/engagements/with-entertainers
        [HttpGet("with-entertainers")]
        public async Task<IActionResult> GetEngagementsWithEntertainers()
        {
            var data = await _context.Engagements
                .Include(e => e.Entertainer)
                .Select(e => new
                {
                    e.EngagementNumber,
                    e.StartDate,
                    e.EndDate,
                    e.StartTime,
                    e.StopTime,
                    e.ContractPrice,
                    e.CustomerID,
                    e.AgentID,
                    Entertainer = e.Entertainer == null ? null : new
                    {
                        e.Entertainer.EntStageName,
                        e.Entertainer.EntCity,
                        e.Entertainer.EntState,
                        e.Entertainer.EntEMailAddress
                    }
                })
                .ToListAsync();

            return Ok(data);
        }
    }
}
