using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IlviraAPI.Models;

namespace IlviraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DessertItemController : ControllerBase
    {
        private readonly IlviraDbContext _context;

        public DessertItemController(IlviraDbContext context)
        {
            _context = context;
        }

        // GET: api/DessertItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DessertItem>>> GettDessertItem()
        {
            return await _context.tDessertItem.ToListAsync();
        }

        // GET: api/DessertItem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DessertItem>> GetDessertItem(int id)
        {
            var dessertItem = await _context.tDessertItem.FindAsync(id);

            if (dessertItem == null)
            {
                return NotFound();
            }

            return dessertItem;
        }

        // PUT: api/DessertItem/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDessertItem(int id, DessertItem dessertItem)
        {
            if (id != dessertItem.DessertItemId)
            {
                return BadRequest();
            }

            _context.Entry(dessertItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DessertItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DessertItem
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DessertItem>> PostDessertItem(DessertItem dessertItem)
        {
            _context.tDessertItem.Add(dessertItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDessertItem", new { id = dessertItem.DessertItemId }, dessertItem);
        }

        // DELETE: api/DessertItem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDessertItem(int id)
        {
            var dessertItem = await _context.tDessertItem.FindAsync(id);
            if (dessertItem == null)
            {
                return NotFound();
            }

            _context.tDessertItem.Remove(dessertItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DessertItemExists(int id)
        {
            return _context.tDessertItem.Any(e => e.DessertItemId == id);
        }
    }
}
