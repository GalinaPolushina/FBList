using WebLab23.Models;
using System.Linq;

namespace WebLab23.Data
{
    public class DBInitializer
    {
        public static void Initialize(ULContext context)
        {
            context.Database.EnsureCreated();

            /*if (context.UList.Any())
            {
                return;
            }*/

            /*var lists = new UList[]
            {
                new UList{Url="http://ya.ru"},
                new UList{Url="http://google.com"},
                new UList{Url="http://rp5.ru"}

            };
            foreach (UList ul in lists)
            {
                context.UList.Add(ul);
            }
            context.SaveChanges();*/

            /*var arts = new Art[]
            {
                new Art { Title="1+1", Type="Фильм", Descr="2011 French buddy comedy-drama film directed by Olivier Nakache & Éric Toledano"},
                new Art { Title="Romeo and Juliet", Type="Книга", Descr="The tragedy written by William Shakespeare early in his career about two young star-crossed lovers whose deaths ultimately reconcile their feuding families."},
                new Art { Title="How to Train Your Dragon", Type="Фильм", Descr="2010 American computer-animated action fantasy film loosely based on the 2003 book of the same name by British author Cressida Cowell, produced by DreamWorks Animation and distributed by Paramount Pictures."}
            };
            foreach (Art a in arts)
            {
                context.Art.Add(a);
            }
            context.SaveChanges();*/

            /*var posts = new Post[]
            {
                new Post { UserId = 1, ArtId=1, Type="Done", Descr="It's a really good film", Rating=5 },
                new Post { UserId = 2, ArtId=2, Type="In progress", Descr="This story was boring", Rating=2},
                new Post { UserId = 2, ArtId=3, Type="Done", Descr="Very cute!!!", Rating=5}
            };
            foreach (Post p in posts)
            {
                context.Post.Add(p);
            }
            context.SaveChanges();*/
        }
    }
}
