import { motion } from "framer-motion";
import { Instagram, Play } from "lucide-react";
import { useSiteSocial, useSiteHeader } from "@/hooks/useSiteContent";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SocialWall = () => {
  const { data: posts } = useSiteSocial();
  const { data: header } = useSiteHeader();

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold tracking-wider mb-4">REDES SOCIAIS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Acompanhe nas Redes</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Siga a Prefeita Juliana Maciel nas redes sociais e fique por dentro de tudo que acontece em Canoinhas.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-wrap justify-center gap-6 mb-12">
          <a href={header?.instagram_url || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-card hover-lift border border-border">
            <Instagram className="w-6 h-6 text-pink-500" />
            <div className="text-left"><p className="font-bold text-foreground">Instagram</p><p className="text-xs text-muted-foreground">Seguir no Instagram</p></div>
          </a>
          <a href={header?.tiktok_url || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-card hover-lift border border-border">
            <TikTokIcon className="w-6 h-6 text-foreground" />
            <div className="text-left"><p className="font-bold text-foreground">TikTok</p><p className="text-xs text-muted-foreground">Seguir no TikTok</p></div>
          </a>
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
                  {post.platform === "instagram" ? <Instagram className="w-5 h-5 text-primary-foreground drop-shadow-lg" /> : <TikTokIcon className="w-5 h-5 text-primary-foreground drop-shadow-lg" />}
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
