using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using DAL.DO;

namespace DAL.Data
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }
        public DbSet<DlDonation> Donations { get; set; }
    }
}
