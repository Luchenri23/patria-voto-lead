import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Play } from "lucide-react";
import { useSiteNews, useSiteArticles } from "@/hooks/useSiteContent";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";

const NewsSection = () => {
  const { data: news } = useSiteNews();
  const { data: articles } = useSiteArticles();

  const featuredNews = news?.find(n => n.is_featured) || news?.[0];
  const recentNews = news?.filter(n => n.id !== featuredNews?.id).slice(0, 3) || [];

  const formatDate = (date: string) => {
    try { return format(new Date(date), "dd MMM yyyy", { locale: ptBR }); }
    catch { return date; }
  };

  const getNewsLink = (item: { id: string; external_url: string | null; content: string | null }) => {
    if (item.external_url) return { href: item.external_url, isExternal: true };
    if (item.content) return { href: `/noticias/${item.id}`, isExternal: false };
    return { href: "#", isExternal: false };
  };

  const getArticleLink = (item: { id: string; external_url: string | null; content: string | null }) => {
    if (item.external_url) return { href: item.external_url, isExternal: true };
    return { href: "#", isExternal: false };
  };

  return (
    <section id="noticias" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold tracking-wider mb-4">FIQUE INFORMADO</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Notícias e Artigos</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2">
            {featuredNews && (() => {
              const link = getNewsLink(featuredNews);
              const Wrapper = link.isExternal
                ? ({ children, className }: { children: React.ReactNode; className: string }) => <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
                : ({ children, className }: { children: React.ReactNode; className: string }) => <Link to={link.href} className={className}>{children}</Link>;
              return (
                <Wrapper className="block">
                  <article className="bg-card rounded-2xl overflow-hidden shadow-lg hover-lift border border-border group">
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      {featuredNews.image_url && <img src={featuredNews.image_url} alt={featuredNews.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                      {featuredNews.video_url && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/30">
                          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-lg"><Play className="w-7 h-7 text-secondary-foreground ml-1" /></div>
                        </div>
                      )}
                      <span className="absolute top-4 left-4 px-4 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full">{featuredNews.category}</span>
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3"><Calendar className="w-4 h-4" />{formatDate(featuredNews.published_at)}</div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{featuredNews.title}</h3>
                      <p className="text-muted-foreground mb-4">{featuredNews.excerpt}</p>
                      <Button className="bg-primary hover:bg-primary/90">Ler matéria completa <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                  </article>
                </Wrapper>
              );
            })()}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {recentNews.map((item, index) => {
                const link = getNewsLink(item);
                const content = (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }} className="bg-card rounded-xl overflow-hidden shadow-card hover-lift border border-border group">
                    <div className="relative h-32 overflow-hidden">
                      {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />}
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded">{item.category}</span>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-2">{formatDate(item.published_at)}</p>
                      <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h4>
                    </div>
                  </motion.div>
                );
                return link.isExternal ? (
                  <a key={item.id} href={link.href} target="_blank" rel="noopener noreferrer" className="block">{content}</a>
                ) : (
                  <Link key={item.id} to={link.href} className="block">{content}</Link>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} id="artigos">
            <div className="bg-primary rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-primary-foreground mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-secondary rounded-full" /> Artigos da Prefeita
              </h3>
              <div className="space-y-4">
                {articles?.slice(0, 5).map((article, index) => {
                  const link = getArticleLink(article);
                  const content = (
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }} className="block p-4 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors group">
                      <p className="text-xs text-secondary mb-2">{formatDate(article.published_at)}</p>
                      <h4 className="text-primary-foreground font-semibold text-sm group-hover:text-secondary transition-colors">{article.title}</h4>
                      <p className="text-primary-foreground/60 text-xs mt-2">por {article.author}</p>
                    </motion.div>
                  );
                  return link.isExternal ? (
                    <a key={article.id} href={link.href} target="_blank" rel="noopener noreferrer">{content}</a>
                  ) : (
                    <div key={article.id}>{content}</div>
                  );
                })}
              </div>
              <Button variant="outline" className="w-full mt-6 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">Ver todos os artigos</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
