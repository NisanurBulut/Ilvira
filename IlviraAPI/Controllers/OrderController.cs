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
    public class OrderController : ControllerBase
    {
        private readonly IlviraDbContext _context;

        public OrderController(IlviraDbContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderMaster>>> GettOrderMaster()
        {
            return await _context.tOrderMaster
                .Include(x => x.Customer).ToListAsync();
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderMaster>> GetOrderMaster(long id)
        {
            // get dessert item from order details
            var orderDetails = await (from master in _context.Set<OrderMaster>()
                                      join detail in _context.Set<OrderDetail>()
                                      on master.OrderMasterId equals detail.OrderMasterId
                                      join dessertItem in _context.Set<DessertItem>()
                                      on master.OrderMasterId equals dessertItem.DessertItemId
                                      where master.OrderMasterId == id
                                      select new
                                      {
                                          master.OrderMasterId,
                                          detail.OrderDetailId,
                                          detail.DessertItemId,
                                          detail.DessertItemPrice,
                                          detail.Quantity,
                                          dessertItem.DessertName
                                      }).ToListAsync();
            var orderMaster = await (from o in _context.Set<OrderMaster>()
                                     where o.OrderMasterId == id
                                     select new
                                     {
                                         o.OrderMasterId,
                                         o.OrderNumber,
                                         o.CustomerId,
                                         o.PaymentMethod,
                                         o.GTotal,
                                         deletedOrderItemIds = "",
                                         orderDetails = orderDetails
                                     }).FirstOrDefaultAsync();
            if (orderMaster == null)
            {
                return NotFound();
            }

            return Ok(orderMaster);
        }

        // PUT: api/Order/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderMaster(long id, OrderMaster orderMaster)
        {
            if (id != orderMaster.OrderMasterId)
            {
                return BadRequest();
            }

            _context.Entry(orderMaster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderMasterExists(id))
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

        // POST: api/Order
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderMaster>> PostOrderMaster(OrderMaster orderMaster)
        {
            _context.tOrderMaster.Add(orderMaster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderMaster", new { id = orderMaster.OrderMasterId }, orderMaster);
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderMaster(long id)
        {
            var orderMaster = await _context.tOrderMaster.FindAsync(id);
            if (orderMaster == null)
            {
                return NotFound();
            }

            _context.tOrderMaster.Remove(orderMaster);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderMasterExists(long id)
        {
            return _context.tOrderMaster.Any(e => e.OrderMasterId == id);
        }
    }
}
