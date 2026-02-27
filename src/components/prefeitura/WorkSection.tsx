import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { useSiteProjects } from "@/hooks/useSiteContent";
import { Link } from "react-router-dom";

const categories = [
  { id: "Saúde", label: "Saúde" },
  { id: "Educação", label: "Educação" },
  { id: "Infraestrutura", label: "Infraestrutura" },
  { id: "Social", label: "Assistência Social" },
];

const WorkSection = () => {
  const [activeCategory, setActiveCategory] = useState("Saúde");
  const { data: projects } = useSiteProjects();

  const filtered = useMemo(
    () => projects?.filter(p => p.category === activeCategory) || [],
    [projects, activeCategory]
  );

  return (
    <section id="trabalho" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wider mb-4">MEU TRABALHO</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Projetos e Realizações</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Conheça as principais ações da gestão em diferentes áreas que impactam diretamente a vida dos canoinhenses.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${activeCategory === cat.id ? "bg-primary text-primary-foreground shadow-lg" : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"}`}>
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => {
              const hasInternalContent = !!project.description?.trim();
              const linkTarget = project.external_url || (hasInternalContent ? `/projetos/${project.id}` : "#");
              const isExternal = !!project.external_url;

              const card = (
                <motion.article key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.4 }} className="bg-card rounded-xl overflow-hidden shadow-card hover-lift border border-border group">
                  <div className="relative h-48 overflow-hidden">
                    {project.image_url && (
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    )}
                    {project.video_url && (
                      <button className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center"><Play className="w-6 h-6 text-secondary-foreground ml-1" /></div>
                      </button>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">{project.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                    <Button variant="ghost" className="p-0 h-auto text-secondary hover:text-primary font-semibold group/btn">
                      Ver detalhes <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </motion.article>
              );

              return isExternal ? (
                <a key={project.id} href={linkTarget} target="_blank" rel="noopener noreferrer">{card}</a>
              ) : (
                <Link key={project.id} to={linkTarget}>{card}</Link>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">Nenhum projeto nesta categoria ainda.</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WorkSection;
