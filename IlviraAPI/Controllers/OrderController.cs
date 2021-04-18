using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using IlviraAPI.Models;

namespace IlviraAPI.Controllers
{
    public class OrderController : Controller
    {
        private readonly IlviraDbContext _context;

        public OrderController(IlviraDbContext context)
        {
            _context = context;
        }

        // GET: Order
        public async Task<IActionResult> Index()
        {
            var ilviraDbContext = _context.tOrderMaster.Include(o => o.Customer);
            return View(await ilviraDbContext.ToListAsync());
        }

        // GET: Order/Details/5
        public async Task<IActionResult> Details(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var orderMaster = await _context.tOrderMaster
                .Include(o => o.Customer)
                .FirstOrDefaultAsync(m => m.OrderMasterId == id);
            if (orderMaster == null)
            {
                return NotFound();
            }

            return View(orderMaster);
        }

        // GET: Order/Create
        public IActionResult Create()
        {
            ViewData["CustomerId"] = new SelectList(_context.tCustomer, "CustomerId", "CustomerId");
            return View();
        }

        // POST: Order/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("OrderMasterId,OrderNumber,CustomerId,PaymentMethod,GTotal")] OrderMaster orderMaster)
        {
            if (ModelState.IsValid)
            {
                _context.Add(orderMaster);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CustomerId"] = new SelectList(_context.tCustomer, "CustomerId", "CustomerId", orderMaster.CustomerId);
            return View(orderMaster);
        }

        // GET: Order/Edit/5
        public async Task<IActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var orderMaster = await _context.tOrderMaster.FindAsync(id);
            if (orderMaster == null)
            {
                return NotFound();
            }
            ViewData["CustomerId"] = new SelectList(_context.tCustomer, "CustomerId", "CustomerId", orderMaster.CustomerId);
            return View(orderMaster);
        }

        // POST: Order/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("OrderMasterId,OrderNumber,CustomerId,PaymentMethod,GTotal")] OrderMaster orderMaster)
        {
            if (id != orderMaster.OrderMasterId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(orderMaster);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OrderMasterExists(orderMaster.OrderMasterId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["CustomerId"] = new SelectList(_context.tCustomer, "CustomerId", "CustomerId", orderMaster.CustomerId);
            return View(orderMaster);
        }

        // GET: Order/Delete/5
        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var orderMaster = await _context.tOrderMaster
                .Include(o => o.Customer)
                .FirstOrDefaultAsync(m => m.OrderMasterId == id);
            if (orderMaster == null)
            {
                return NotFound();
            }

            return View(orderMaster);
        }

        // POST: Order/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            var orderMaster = await _context.tOrderMaster.FindAsync(id);
            _context.tOrderMaster.Remove(orderMaster);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool OrderMasterExists(long id)
        {
            return _context.tOrderMaster.Any(e => e.OrderMasterId == id);
        }
    }
}
