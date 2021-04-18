using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IlviraAPI.Models
{
    public class OrderMaster
    {
        [Key]
        public long OrderMasterId { get; set; }
        [Column(TypeName ="nvarchar(75)")]
        public string OrderNumber { get; set; }
        public int CustomerId { get; set; }
        [Column(TypeName = "nvarchar(15)")]
        public string PaymentMethod { get; set; }
        public decimal GTotal { get; set; }
    }
}
