using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLab23.Models
{
    public class Art
    {
        public Art()
        {
            Posts = new HashSet<Post>();
        }
        public virtual ICollection<Post> Posts { get; set; }

        public int ArtId { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Descr { get; set; }
    }
}
