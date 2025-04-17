using System.ComponentModel.DataAnnotations;

namespace Final413Hair.API.Data
{
    public class Engagement
    {
        [Key]
        public long EngagementNumber { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? StartTime { get; set; }
        public string? StopTime { get; set; }
        public decimal? ContractPrice { get; set; }
        public long? CustomerID { get; set; }
        public long? AgentID { get; set; }

        // Foreign Key
        public long? EntertainerID { get; set; }

        // Navigation property
        public Entertainer? Entertainer { get; set; }
    }
}
