using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IlviraAPI.Models
{
    [Table("tDessert")]
    public class DessertItem
    {
        [Key]
        public int DessertItemId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string DessertName { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
    }
}
