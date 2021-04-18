using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IlviraAPI.Models
{
    public class OrderDetail
    {
        [Key]
        public long OrderDetailId { get; set; }
        public long OrderMasterId { get; set; }
        public int DessertItemId { get; set; }
        public decimal DessetItemPrice { get; set; }
        public int Quantity { get; set; }
    }
}
