import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const Counter = ({ end, duration = 2000, suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-navy-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-brazil rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {/* Counter 1 */}
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-black text-gold mb-2">
              <Counter end={111588} />
            </div>
            <p className="text-primary-foreground/80 font-medium">
              catarinenses confiaram em mim
            </p>
          </div>

          {/* Center message */}
          <div className="text-center py-8 md:py-0 md:border-x border-primary-foreground/20">
            <p className="text-xl md:text-2xl font-bold text-primary-foreground mb-4">
              Temos a confiança de milhares de brasileiros que acreditam em um{" "}
              <span className="text-gold">Brasil livre</span>.
            </p>
            <Button
              size="lg"
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold"
            >
              <Youtube className="mr-2 h-5 w-5" />
              INSCREVA-SE NO CANAL
            </Button>
          </div>

          {/* Counter 2 */}
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-black text-green-brazil-light mb-2">
              <Counter end={52} suffix="%" />
            </div>
            <p className="text-primary-foreground/80 font-medium">
              dos votos na região
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
