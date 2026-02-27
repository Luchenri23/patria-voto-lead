import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Volume2, VolumeX } from "lucide-react";
import { useSiteHero } from "@/hooks/useSiteContent";

const HeroSection = () => {
  const { data: hero } = useSiteHero();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const hasVideo = !!hero?.video_url && !videoError;
  const hasImage = !!hero?.image_url;
  const fallbackColor = hero?.fallback_color || "hsl(213, 56%, 24%)";

  // Conditional rendering helpers
  const hasStat1 = !!(hero?.card_stat1_value?.trim() && hero?.card_stat1_label?.trim());
  const hasStat2 = !!(hero?.card_stat2_value?.trim() && hero?.card_stat2_label?.trim());
  const hasStats = hasStat1 || hasStat2;
  const hasBadgeRight = !!hero?.badge_right?.trim();
  const hasBadgeLeft = !!hero?.badge_left?.trim();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0" style={{ backgroundColor: fallbackColor }}>
        <div className="absolute inset-0 bg-gradient-hero" />
        {hasImage && (
          <img
            src={hero.image_url!}
            alt=""
            loading="eager"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              hasVideo && videoLoaded ? "opacity-0" : "opacity-20"
            }`}
          />
        )}
        {hero?.video_url && !videoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={hero?.image_url || undefined}
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-30" : "opacity-0"
            }`}
          >
            <source src={hero.video_url} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />
      </div>

      {hasVideo && videoLoaded && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-20 right-6 z-20 p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </motion.button>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary" />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-6">
               <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium border border-secondary/30">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                {hero?.badge_text || "Gestão 2025-2028 • Canoinhas/SC"}
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              {hero?.title || "Trabalhando por uma Canoinhas melhor para todos"}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-lg text-primary-foreground/80 mb-8 leading-relaxed max-w-xl">
              {hero?.subtitle || "Transparência, compromisso e resultados."}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6" asChild>
                <a href={hero?.cta_link || "#trabalho"}>
                  {hero?.cta_text || "Ver Realizações"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              {hero?.agenda_url ? (
                <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold" asChild>
                  <a href={hero.agenda_url} target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-4 w-4" />
                    {hero?.cta2_text || "Agenda da Prefeita"}
                  </a>
                </Button>
              ) : hero?.cta2_text?.trim() ? (
                <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold">
                  <Calendar className="mr-2 h-4 w-4" />
                  {hero.cta2_text}
                </Button>
              ) : null}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }} className="relative hidden lg:block">
            <div className="relative">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto bg-gradient-to-br from-secondary/30 to-primary-foreground/20 rounded-full flex items-center justify-center mb-6 border-4 border-secondary/30 overflow-hidden">
                    {hero?.card_image_url ? (
                      <img src={hero.card_image_url} alt={hero?.card_name || "Foto"} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-6xl">👩‍💼</span>
                    )}
                  </div>
                   <h3 className="text-2xl font-bold text-primary-foreground mb-2">{hero?.card_name || "Juliana Maciel"}</h3>
                  <p className="text-secondary font-semibold mb-4">{hero?.card_subtitle || "Prefeita de Canoinhas"}</p>
                  {hasStats && (
                    <div className={`grid gap-4 text-primary-foreground/80 text-sm ${hasStat1 && hasStat2 ? "grid-cols-2" : "grid-cols-1"}`}>
                      {hasStat1 && (
                        <div className="p-3 bg-primary-foreground/5 rounded-lg">
                          <p className="font-bold text-secondary text-lg">{hero?.card_stat1_value}</p>
                          <p>{hero?.card_stat1_label}</p>
                        </div>
                      )}
                      {hasStat2 && (
                        <div className="p-3 bg-primary-foreground/5 rounded-lg">
                          <p className="font-bold text-secondary text-lg">{hero?.card_stat2_value}</p>
                          <p>{hero?.card_stat2_label}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {hasBadgeRight && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.5 }} className="absolute -right-4 top-10 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow-lg font-semibold text-sm">
                  {hero?.badge_right}
                </motion.div>
              )}
              {hasBadgeLeft && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.5 }} className="absolute -left-4 bottom-20 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg font-semibold text-sm">
                  {hero?.badge_left}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-3 bg-secondary rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
