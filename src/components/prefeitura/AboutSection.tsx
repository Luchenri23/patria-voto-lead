import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, X } from "lucide-react";
import { useSiteAbout } from "@/hooks/useSiteContent";

interface StatCardProps {
  value: string;
  label: string;
  colorClass: string;
  sizeClass?: string;
}

const StatCard = ({ value, label, colorClass, sizeClass = "text-2xl" }: StatCardProps) => {
  const parts = label.split(" - ");
  const title = parts[0];
  const description = parts.length > 1 ? parts.slice(1).join(" - ") : null;

  return (
    <div className="bg-card rounded-xl p-3 sm:p-4 shadow-md border border-border min-w-[140px] flex-shrink-0 snap-start">
      <p className={`${sizeClass} font-bold ${colorClass}`}>{value}</p>
      <p className="text-xs sm:text-sm font-medium text-foreground/80 leading-tight">{title}</p>
      {description && (
        <p className="text-[11px] sm:text-xs text-muted-foreground leading-tight mt-1 line-clamp-3">{description}</p>
      )}
    </div>
  );
};

const AboutSection = () => {
  const { data: about } = useSiteAbout();
  const [showBio, setShowBio] = useState(false);
  const [showTrajectory, setShowTrajectory] = useState(false);

  const paragraphs = about?.biography?.split("\n\n") || [];
  const hasVideo = !!about?.video_url;
  const hasImage = !!about?.image_url;
  const hasFullBio = !!about?.full_bio?.trim();
  const hasTrajectory = !!about?.trajectory?.trim();

  const stats = [
    { filled: !!(about?.stat_1_value?.trim() && about?.stat_1_label?.trim()), value: about?.stat_1_value || "", label: about?.stat_1_label || "", color: "text-secondary" },
    { filled: !!(about?.stat_2_value?.trim() && about?.stat_2_label?.trim()), value: about?.stat_2_value || "", label: about?.stat_2_label || "", color: "text-primary" },
    { filled: !!(about?.stat_3_value?.trim() && about?.stat_3_label?.trim()), value: about?.stat_3_value || "", label: about?.stat_3_label || "", color: "text-accent" },
  ].filter(s => s.filled);

  return (
    <section id="quem-sou" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image + Stats */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col">
            <div className="rounded-2xl overflow-hidden bg-muted shadow-xl">
              <div className="aspect-[3/4] sm:aspect-video">
                {hasVideo ? (
                  <video
                    src={about!.video_url!}
                    controls
                    className="w-full h-full object-cover"
                    poster={hasImage ? about!.image_url! : undefined}
                  />
                ) : hasImage ? (
                  <img
                    src={about!.image_url!}
                    alt="Conheça minha história"
                    className="w-full h-full object-contain sm:object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                    <div className="text-center">
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-lg mb-4 mx-auto">
                        <Play className="w-8 h-8 text-secondary-foreground ml-1" />
                      </motion.button>
                      <p className="text-primary-foreground font-medium">Conheça minha história</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {stats.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-3">
                {/* Mobile: horizontal scroll */}
                <div className="sm:hidden flex gap-2.5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none">
                  {stats.map((s, i) => (
                    <StatCard key={i} value={s.value} label={s.label} colorClass={s.color} sizeClass="text-xl" />
                  ))}
                </div>
                {/* Desktop: grid */}
                <div className="hidden sm:grid sm:grid-cols-3 gap-3">
                  {stats.map((s, i) => (
                    <StatCard key={i} value={s.value} label={s.label} colorClass={s.color} />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Text */}
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
            {(hasFullBio || hasTrajectory) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {hasFullBio && (
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowBio(true)}>
                    <BookOpen className="mr-2 h-4 w-4" /> Ler Bio Completa
                  </Button>
                )}
                {hasTrajectory && (
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10" onClick={() => setShowTrajectory(true)}>
                    Ver Trajetória
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bio Modal */}
      <AnimatePresence>
        {showBio && hasFullBio && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowBio(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl border border-border w-full" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-foreground">Bio Completa</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowBio(false)}><X className="w-5 h-5" /></Button>
              </div>
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                {about?.full_bio || ""}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trajectory Modal */}
      <AnimatePresence>
        {showTrajectory && hasTrajectory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowTrajectory(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl border border-border w-full" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-foreground">Trajetória</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowTrajectory(false)}><X className="w-5 h-5" /></Button>
              </div>
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                {about?.trajectory || ""}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutSection;
