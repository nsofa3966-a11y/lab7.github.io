using Microsoft.EntityFrameworkCore;

namespace LR7_PP.Models
{
    public class HotelsContext : DbContext
    {
        public DbSet<Hotel> Hotel { get; set; }

        public HotelsContext(DbContextOptions<HotelsContext> options) : base(options)
        {
            Database.EnsureCreated(); // Автоматически создаст таблицу, если её нет
        }
    }
}
