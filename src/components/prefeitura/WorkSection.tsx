import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useSiteProjects } from "@/hooks/useSiteContent";
import { Link } from "react-router-dom";

const WorkSection = () => {
  const { data: projects } = useSiteProjects();

  const list = projects || [];
  const featured = list[0];
  const recent = list.slice(1, 4);

  const getLink = (project: { id: string; description: string; external_url: string | null }) => {
    if (project.external_url) return { href: project.external_url, isExternal: true };
    if (project.description?.trim()) return { href: `/projetos/${project.id}`, isExternal: false };
    return { href: "#", isExternal: false };
  };

  return (
    <section id="trabalho" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wider mb-4">MEU TRABALHO</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Projetos e Realizações</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Conheça meus principais projetos e realizações que fizeram a diferença.</p>
        </motion.div>

        {list.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Nenhum projeto cadastrado ainda.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2">
              {featured && (() => {
                const link = getLink(featured);
                const Wrapper = link.isExternal
                  ? ({ children, className }: { children: React.ReactNode; className: string }) => <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
                  : ({ children, className }: { children: React.ReactNode; className: string }) => <Link to={link.href} className={className}>{children}</Link>;
                return (
                  <Wrapper className="block">
                    <article className="bg-card rounded-2xl overflow-hidden shadow-lg hover-lift border border-border group">
                      <div className="relative h-64 md:h-80 overflow-hidden">
                        {featured.image_url && (
                          <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        )}
                        {featured.video_url && (
                          <div className="absolute inset-0 flex items-center justify-center bg-primary/30">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                              <Play className="w-7 h-7 text-secondary-foreground ml-1" />
                            </div>
                          </div>
                        )}
                        <span className="absolute top-4 left-4 px-4 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full">{featured.category}</span>
                      </div>
                      <div className="p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{featured.title}</h3>
                        {featured.description && <p className="text-muted-foreground mb-4 line-clamp-3">{featured.description}</p>}
                        <Button className="bg-primary hover:bg-primary/90">Ver detalhes <ArrowRight className="ml-2 h-4 w-4" /></Button>
                      </div>
                    </article>
                  </Wrapper>
                );
              })()}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-4">
              {recent.map((project, index) => {
                const link = getLink(project);
                const card = (
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }} className="bg-card rounded-xl overflow-hidden shadow-card hover-lift border border-border group flex">
                    <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                      {project.image_url && (
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      )}
                    </div>
                    <div className="p-4 flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-semibold rounded mb-2">{project.category}</span>
                      <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">{project.title}</h4>
                    </div>
                  </motion.div>
                );
                return link.isExternal ? (
                  <a key={project.id} href={link.href} target="_blank" rel="noopener noreferrer" className="block">{card}</a>
                ) : (
                  <Link key={project.id} to={link.href} className="block">{card}</Link>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkSection;
