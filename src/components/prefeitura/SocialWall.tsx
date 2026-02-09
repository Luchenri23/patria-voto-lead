import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useSiteSocial, useSiteSocialLinks } from "@/hooks/useSiteContent";
import SocialIcon from "@/components/prefeitura/SocialIcon";

const SocialWall = () => {
  const { data: posts } = useSiteSocial();
  const { data: socialLinks } = useSiteSocialLinks();

  const visibleSocial = socialLinks?.filter(l => l.visible) || [];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold tracking-wider mb-4">REDES SOCIAIS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Acompanhe nas Redes</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Siga a Prefeita Juliana Maciel nas redes sociais e fique por dentro de tudo que acontece em Canoinhas.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-wrap justify-center gap-6 mb-12">
          {visibleSocial.map((link) => (
            <a key={link.id} href={link.url || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-card hover-lift border border-border">
              <SocialIcon platform={link.platform} iconUrl={link.icon_url} className="w-6 h-6 text-primary" />
              <div className="text-left">
                <p className="font-bold text-foreground">{link.label}</p>
                <p className="text-xs text-muted-foreground">Seguir no {link.label}</p>
              </div>
            </a>
          ))}
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {posts?.map((post, index) => (
            <motion.div key={post.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }} className="break-inside-avoid">
              <a href={post.post_url} target="_blank" rel="noopener noreferrer" className="relative rounded-xl overflow-hidden group cursor-pointer block">
                {post.image_url && (
                  <img src={post.image_url} alt={post.caption || `Post ${index + 1}`} className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${post.platform === "tiktok" ? "aspect-[9/16]" : "aspect-square"}`} />
                )}
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {post.post_type === "video" && (
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center"><Play className="w-5 h-5 text-secondary-foreground ml-0.5" /></div>
                  )}
                  {post.caption && <p className="absolute bottom-3 left-3 right-3 text-primary-foreground text-xs font-medium line-clamp-2">{post.caption}</p>}
                </div>
                <div className="absolute top-3 left-3">
                  <SocialIcon platform={post.platform} className="w-5 h-5 text-primary-foreground drop-shadow-lg" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialWall;
