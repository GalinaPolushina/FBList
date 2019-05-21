using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace WebLab23.Models
{
    public partial class ULContext : IdentityDbContext<User>
    {
        #region Constructor
        public ULContext(DbContextOptions<ULContext> options)
            : base(options)
        { }
        #endregion

        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<Art> Art { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /*modelBuilder.Entity<UList>(entity =>
            {
                entity.Property(e => e.Url).IsRequired();
            });*/

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasOne(us => us.User)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(us => us.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Art>(entity =>
            {
                entity.HasMany(p => p.Posts)
                    .WithOne(a => a.Art)
                    .HasForeignKey(a => a.ArtId);
            });
        }
    }
}
