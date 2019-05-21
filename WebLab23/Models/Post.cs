using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLab23.Models
{
    public class Post
    {
        public string UserId { get; set; }
        public int ArtId { get; set; }
        public int PostId { get; set; }
        public string Type { get; set; }
        public string Descr { get; set; }
        public int Rating { get; set; }
        
        public virtual User User { get; set; }
        public virtual Art Art { get; set; }
    }
}

