using WebLab23.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace WebLab23.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtController : ControllerBase
    {
        private readonly ULContext _context;

        public ArtController(ULContext context)
        {
            _context = context;
            if (_context.Art.Count() == 0)
            {
                _context.Art.Add(new Art { Title = "Harry Potter and the Chamber of Secrets", Type = "Книга", Descr = "A fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series" });
                _context.SaveChanges();
            }
        }

        //Получение всех записей
        [HttpGet]
        public IEnumerable<Art> GetAll()
        {
            return _context.Art;
        }

        //Получение записи по ключу
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var list = await _context.Art.SingleOrDefaultAsync(m => m.ArtId == id);

            if (list == null)
            {
                return NotFound();
            }

            return Ok(list);
        }

        [Authorize(Roles = "admin, user")]
        //Создание записи
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Art art)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
          //  art.ArtId = _context.Art.Last().ArtId + 1;
            _context.Art.Add(art);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArt", new { id = art.ArtId }, art);
        }

        [Authorize(Roles = "admin, user")]
        //Обновление записи
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Art art)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Art.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.Title = art.Title;
            item.Type = art.Type;
            item.Descr = art.Descr;
            _context.Art.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "admin")]
        //Удаление записи
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Art.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Art.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
