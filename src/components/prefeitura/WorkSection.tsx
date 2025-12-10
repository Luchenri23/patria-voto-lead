import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

const categories = [
  { id: "saude", label: "Saúde", color: "secondary" },
  { id: "educacao", label: "Educação", color: "primary" },
  { id: "infraestrutura", label: "Infraestrutura", color: "accent" },
  { id: "social", label: "Assistência Social", color: "teal" },
];

const projects = {
  saude: [
    {
      id: 1,
      title: "Nova UBS Central",
      description: "Construção de nova Unidade Básica de Saúde com atendimento 24h",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop",
      hasVideo: true,
    },
    {
      id: 2,
      title: "Programa Saúde da Família",
      description: "Ampliação do PSF para todas as regiões do município",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      hasVideo: false,
    },
    {
      id: 3,
      title: "Farmácia Municipal",
      description: "Distribuição gratuita de medicamentos essenciais",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=250&fit=crop",
      hasVideo: true,
    },
  ],
  educacao: [
    {
      id: 4,
      title: "Reforma das Escolas",
      description: "Modernização de 15 escolas municipais com laboratórios de informática",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop",
      hasVideo: false,
    },
    {
      id: 5,
      title: "Creches em Tempo Integral",
      description: "Ampliação de vagas e construção de novas creches",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
      hasVideo: true,
    },
    {
      id: 6,
      title: "Transporte Escolar",
      description: "Renovação da frota de ônibus escolares do município",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=250&fit=crop",
      hasVideo: false,
    },
  ],
  infraestrutura: [
    {
      id: 7,
      title: "Pavimentação de Ruas",
      description: "Mais de 50km de ruas pavimentadas em diversos bairros",
      image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&h=250&fit=crop",
      hasVideo: true,
    },
    {
      id: 8,
      title: "Iluminação LED",
      description: "Substituição de toda iluminação pública por LED",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      hasVideo: false,
    },
    {
      id: 9,
      title: "Revitalização do Centro",
      description: "Projeto de modernização da área central da cidade",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=250&fit=crop",
      hasVideo: true,
    },
  ],
  social: [
    {
      id: 10,
      title: "CRAS Itinerante",
      description: "Atendimento social nas comunidades rurais",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
      hasVideo: false,
    },
    {
      id: 11,
      title: "Programa de Habitação",
      description: "Construção de casas populares para famílias carentes",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
      hasVideo: true,
    },
    {
      id: 12,
      title: "Banco de Alimentos",
      description: "Combate à fome e desperdício de alimentos",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop",
      hasVideo: false,
    },
  ],
};

const WorkSection = () => {
  const [activeCategory, setActiveCategory] = useState("saude");

  return (
    <section id="trabalho" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wider mb-4">
            MEU TRABALHO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Projetos e Realizações
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça as principais ações da gestão em diferentes áreas que impactam 
            diretamente a vida dos canoinhenses.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects[activeCategory as keyof typeof projects].map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-card rounded-xl overflow-hidden shadow-card hover-lift border border-border group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {project.hasVideo && (
                    <button className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-secondary-foreground ml-1" />
                      </div>
                    </button>
                  )}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {categories.find((c) => c.id === activeCategory)?.label}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-secondary hover:text-primary font-semibold group/btn">
                    Ver detalhes
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Ver todos os projetos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
