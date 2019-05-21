using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebLab23.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            Posts = new HashSet<Post>();
        }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
