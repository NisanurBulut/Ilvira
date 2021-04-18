using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IlviraAPI.Models
{
    [Table("tOrderDetail")]
    public class OrderDetail
    {
        [Key]
        public long OrderDetailId { get; set; }
        public long OrderMasterId { get; set; }
        public int DessertItemId { get; set; }
        public DessertItem DessertItem { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal DessertItemPrice { get; set; }
        public int Quantity { get; set; }
    }
}
