import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, BookOpen } from "lucide-react";
import { useSiteAbout } from "@/hooks/useSiteContent";

const AboutSection = () => {
  const { data: about } = useSiteAbout();

  const paragraphs = about?.biography?.split("\n\n") || [];

  return (
    <section id="quem-sou" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                <div className="text-center">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-lg mb-4 mx-auto">
                    <Play className="w-8 h-8 text-secondary-foreground ml-1" />
                  </motion.button>
                  <p className="text-primary-foreground font-medium">Conheça minha história</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="absolute -bottom-6 left-6 right-6 flex gap-4">
              <div className="flex-1 bg-card rounded-xl p-4 shadow-lg border border-border">
                <p className="text-2xl font-bold text-secondary">{about?.stat_1_value || "32"}</p>
                <p className="text-sm text-muted-foreground">{about?.stat_1_label || "Anos"}</p>
              </div>
              <div className="flex-1 bg-card rounded-xl p-4 shadow-lg border border-border">
                <p className="text-2xl font-bold text-primary">{about?.stat_2_value || "2º"}</p>
                <p className="text-sm text-muted-foreground">{about?.stat_2_label || "Mandato"}</p>
              </div>
              <div className="flex-1 bg-card rounded-xl p-4 shadow-lg border border-border">
                <p className="text-2xl font-bold text-accent">{about?.stat_3_value || "1ª"}</p>
                <p className="text-sm text-muted-foreground">{about?.stat_3_label || "Mulher Amplanorte"}</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:pl-8">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold tracking-wider mb-6">QUEM SOU</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Juliana Maciel Hoppe</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              {paragraphs.length > 0 ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : (
                <>
                  <p>Nascida e criada em <strong className="text-foreground">Canoinhas</strong>, tenho 32 anos e sou a mais jovem prefeita da história do município.</p>
                  <p>Em 2020, fui eleita pela primeira vez com amplo apoio popular. Em 2024, conquistamos a <strong className="text-foreground">reeleição</strong>.</p>
                </>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90"><BookOpen className="mr-2 h-4 w-4" /> Ler Bio Completa</Button>
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">Ver Trajetória</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
