using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


namespace Final413Hair.API.Data
{
    public class AgencyDbContext : DbContext
    {
        public AgencyDbContext(DbContextOptions<AgencyDbContext> options)
            : base(options)
        {
        }

        public DbSet<Engagement> Engagements { get; set; }
        public DbSet<Entertainer> Entertainers { get; set; }
    }
}
