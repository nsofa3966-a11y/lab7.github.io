using LR7_PP.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace LR7_PP
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Подключение к БД
            services.AddDbContext<HotelsContext>(options =>
                options.UseSqlServer(SqlConnectionIntegratedSecurity));
            services.AddControllers(); // Для контроллеров без представлений
        }

        public static string SqlConnectionIntegratedSecurity
        {
            get
            {
                var sb = new SqlConnectionStringBuilder
                {
                    DataSource = "LAPTOP-2BI2ASH4", // Замените на ваш сервер, например "(localdb)\\MSSQLLocalDB"
                    IntegratedSecurity = true,
                    InitialCatalog = "ToursDB"
                };
                return sb.ConnectionString;
            }
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseDeveloperExceptionPage();
            app.UseRouting();
            app.UseDefaultFiles(); // Для index.html по умолчанию
            app.UseStaticFiles(); // Для статических файлов (CSS, JS)
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); // Маршрутизация к контроллерам
            });
        }
    }
}

Найти еще
