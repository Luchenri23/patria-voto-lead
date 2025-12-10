import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Play } from "lucide-react";

const featuredNews = {
  id: 1,
  title: "Canoinhas recebe investimentos de R$ 15 milhões em infraestrutura",
  excerpt: "Prefeita Juliana Maciel anuncia pacote de obras que inclui pavimentação, iluminação e revitalização de espaços públicos em diversos bairros do município.",
  date: "10 Dez 2024",
  category: "Infraestrutura",
  image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
  hasVideo: true,
};

const recentNews = [
  {
    id: 2,
    title: "Nova UBS é inaugurada no bairro Campo da Água Verde",
    date: "08 Dez 2024",
    category: "Saúde",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Programa de capacitação forma 200 jovens para o mercado de trabalho",
    date: "05 Dez 2024",
    category: "Educação",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    title: "Mutirão de limpeza mobiliza comunidade no final de semana",
    date: "02 Dez 2024",
    category: "Meio Ambiente",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop",
  },
];

const articles = [
  {
    id: 1,
    title: "O papel da gestão municipal no desenvolvimento regional",
    author: "Juliana Maciel",
    date: "09 Dez 2024",
  },
  {
    id: 2,
    title: "Transparência e participação popular: pilares da nossa gestão",
    author: "Juliana Maciel",
    date: "01 Dez 2024",
  },
  {
    id: 3,
    title: "Canoinhas rumo ao futuro: nossos planos para 2025",
    author: "Juliana Maciel",
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
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold tracking-wider mb-4">
            FIQUE INFORMADO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Notícias e Artigos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured News - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <article className="bg-card rounded-2xl overflow-hidden shadow-lg hover-lift border border-border group">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {featuredNews.hasVideo && (
                  <button className="absolute inset-0 flex items-center justify-center bg-primary/30">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-7 h-7 text-secondary-foreground ml-1" />
                    </div>
                  </button>
                )}
                <span className="absolute top-4 left-4 px-4 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full">
                  {featuredNews.category}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  {featuredNews.date}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {featuredNews.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {featuredNews.excerpt}
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Ler matéria completa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </article>

            {/* Recent News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {recentNews.map((news, index) => (
                <motion.article
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover-lift border border-border group"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded">
                      {news.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-2">{news.date}</p>
                    <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h4>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Articles - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="artigos"
          >
            <div className="bg-primary rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-primary-foreground mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-secondary rounded-full" />
                Artigos da Prefeita
              </h3>
              <div className="space-y-4">
                {articles.map((article, index) => (
                  <motion.a
                    key={article.id}
                    href="#"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    className="block p-4 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors group"
                  >
                    <p className="text-xs text-secondary mb-2">{article.date}</p>
                    <h4 className="text-primary-foreground font-semibold text-sm group-hover:text-secondary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-primary-foreground/60 text-xs mt-2">
                      por {article.author}
                    </p>
                  </motion.a>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Ver todos os artigos
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
