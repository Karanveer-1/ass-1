using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Khanna_Seltzer_ass1.Models
{
    public class Boat
    {
        [Key]
        [Required]
        public int BoatId { get; set; }
        [Required]
        public String BoatName { get; set; }
        [Required]
        public String Picture { get; set; }
        [Required]
        public String LengthInFeet { get; set; }
        [Required]
        public String Make { get; set; }
        [Required]
        public String Description { get; set; }
    }
}
