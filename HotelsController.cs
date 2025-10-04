using LR7_PP.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LR7_PP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly HotelsContext _db;

        public HotelsController(HotelsContext hotelsContext)
        {
            _db = hotelsContext;
        }

        // GET: api/Hotels (получить все отели)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> Get()
        {
            return await _db.Hotel.ToListAsync();
        }

        // GET: api/Hotels/5 (получить отель по ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> Get(int id)
        {
            var hotel = await _db.Hotel.FirstOrDefaultAsync(x => x.Id == id);
            if (hotel == null)
                return NotFound();
            return new ObjectResult(hotel);
        }

        // POST: api/Hotels (добавить новый отель)
        [HttpPost]
        public async Task<ActionResult<Hotel>> Post(Hotel hotel)
        {
            if (hotel == null)
                return BadRequest();
            _db.Hotel.Add(hotel);
            await _db.SaveChangesAsync();
            return Ok(hotel);
        }

        // PUT: api/Hotels/5 (обновить отель)
        [HttpPut("{id}")]
        public async Task<ActionResult<Hotel>> Put(Hotel hotel)
        {
            if (hotel == null)
                return BadRequest();
            if (!_db.Hotel.Any(x => x.Id == hotel.Id))
                return NotFound();
            _db.Update(hotel);
            await _db.SaveChangesAsync();
            return Ok(hotel);
        }

        // DELETE: api/Hotels/5 (удалить отель)
        [HttpDelete("{id}")]
        public async Task<ActionResult<Hotel>> Delete(int id)
        {
            var hotel = _db.Hotel.FirstOrDefault(x => x.Id == id);
            if (hotel == null)
                return NotFound();
            _db.Hotel.Remove(hotel);
            await _db.SaveChangesAsync();
            return Ok(hotel);
        }
    }
}
