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
    public class PostController : ControllerBase
    {
        private readonly ULContext _context;

        public PostController(ULContext context)
        {
            _context = context;
            if (_context.Post.Count() == 0)
            {
                _context.Post.Add(new Post { UserId = "f18433a8-843d-40c7-8969-b5f9ef466f2d", ArtId = 1, Type = "Done", Descr = "It's a really-really good film!!!", Rating = 5 });
                _context.SaveChanges();
            }
        }

        //Получение всех записей
        [HttpGet]
        public IEnumerable<Post> GetAll()
        {
            //return _context.Post;
            return _context.Post.Include(a => a.Art);
            //return _context.UList.Include(p => p.Post).ThenInclude(a => a.Art);
        }

        //Получение записи по ключу
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var list = await _context.Post.SingleOrDefaultAsync(m => m.PostId == id);

            if (list == null)
            {
                return NotFound();
            }

            return Ok(list);
        }

        [Authorize(Roles = "admin, user")]
        //Создание записи
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Post.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPost", new { id = post.PostId }, post);
        }

        [Authorize(Roles = "admin, user")]
        //Обновление записи
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Post.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.UserId = post.UserId;
            item.ArtId = post.ArtId;
            item.Type = post.Type;
            item.Descr = post.Descr;
            item.Rating = post.Rating;
            _context.Post.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "admin, user")]
        //Удаление записи
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Post.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Post.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
