import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const newsArticles = [
  {
    id: 1,
    title: "Projeto de Lei para desburocratização do agronegócio avança na Câmara",
    excerpt: "Proposta visa reduzir entraves burocráticos e fortalecer o setor produtivo brasileiro.",
    date: "10 Dez 2024",
    category: "Legislativo",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Deputada participa de reunião com produtores rurais de SC",
    excerpt: "Encontro discutiu pautas importantes para o desenvolvimento do setor agropecuário.",
    date: "08 Dez 2024",
    category: "Eventos",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Frente Parlamentar da Liberdade Econômica ganha novos membros",
    excerpt: "Movimento cresce no Congresso com adesão de mais 15 parlamentares.",
    date: "05 Dez 2024",
    category: "Política",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&h=250&fit=crop",
  },
];

const opinionArticles = [
  {
    id: 1,
    title: "Por que precisamos defender a liberdade de expressão",
    author: "Dep. Maria Silva",
    date: "09 Dez 2024",
  },
  {
    id: 2,
    title: "O papel da família na construção de uma nação forte",
    author: "Dep. Maria Silva",
    date: "02 Dez 2024",
  },
  {
    id: 3,
    title: "Economia livre: o caminho para a prosperidade",
    author: "Dep. Maria Silva",
    date: "25 Nov 2024",
  },
];

const NewsSection = () => {
  return (
    <section id="noticias" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-green-brazil/10 text-green-brazil rounded-full text-sm font-semibold tracking-wider mb-4">
            FIQUE POR DENTRO
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            NOTÍCIAS E <span className="text-gold">ARTIGOS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* News Grid */}
          {newsArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover-lift border border-border group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gold text-foreground text-xs font-bold rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-green-brazil hover:text-gold font-semibold group/btn"
                >
                  Ler mais
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Opinion Articles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-navy-gradient rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-primary-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-gold rounded-full" />
            Artigos de Opinião
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {opinionArticles.map((article, index) => (
              <motion.a
                key={article.id}
                href="#"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 bg-primary-foreground/5 rounded-lg hover:bg-primary-foreground/10 transition-colors group"
              >
                <p className="text-xs text-gold mb-2">{article.date}</p>
                <h4 className="text-primary-foreground font-semibold group-hover:text-gold transition-colors">
                  {article.title}
                </h4>
                <p className="text-primary-foreground/60 text-sm mt-2">
                  por {article.author}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
