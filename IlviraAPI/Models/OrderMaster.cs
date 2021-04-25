using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IlviraAPI.Models
{
    [Table("tOrderMaster")]
    public class OrderMaster
    {
        [Key]
        public long OrderMasterId { get; set; }
        [Column(TypeName ="nvarchar(75)")]
        public string OrderNumber { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        [Column(TypeName = "nvarchar(15)")]
        public string PaymentMethod { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal GTotal { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }
        [NotMapped]
        public string DeletedOrderItemIds { get; set; }
    }
}
