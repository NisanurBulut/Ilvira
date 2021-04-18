using Microsoft.EntityFrameworkCore;

namespace IlviraAPI.Models
{
    public class IlviraDbContext : DbContext
    {
        public IlviraDbContext(DbContextOptions<IlviraDbContext> options) : base(options)
        {

        }
        public DbSet<Customer> tCustomer { get; set; }
        public DbSet<DessertItem> tDessertItem { get; set; }
        public DbSet<OrderMaster> tOrderMaster { get; set; }
        public DbSet<OrderMaster> tOrderDetail { get; set; }
    }
}
