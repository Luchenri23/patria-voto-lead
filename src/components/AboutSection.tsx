import { motion } from "framer-motion";
import { Shield, Users, Landmark, Scale, HeartHandshake, Target } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    { icon: Shield, text: "Defesa do Armamento Civil" },
    { icon: Users, text: "Proteção da Família Tradicional" },
    { icon: Landmark, text: "Liberdade Econômica" },
    { icon: Scale, text: "Combate à Corrupção" },
    { icon: HeartHandshake, text: "Valores Cristãos" },
    { icon: Target, text: "Soberania Nacional" },
  ];

  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-semibold tracking-wider mb-6">
              MANIFESTO
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              PRONTA PARA O{" "}
              <span className="text-navy">COMBATE</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Nascida e criada no interior de Santa Catarina, sempre acreditei que o 
              trabalho honesto e os valores da família são a base de uma nação forte. 
              Empresária por mais de 20 anos, entrei na política para defender a{" "}
              <strong className="text-foreground">liberdade</strong> do cidadão de bem e combater 
              a corrupção que assola nosso país.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              No Congresso Nacional, minha voz é a voz dos catarinenses que não se 
              curvam às agendas ideológicas e que lutam por um Brasil próspero, 
              seguro e soberano.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-gold/10 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-green-brazil/10 text-green-brazil group-hover:bg-gold/20 group-hover:text-gold transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-navy-gradient rounded-2xl p-8 text-primary-foreground">
                <div className="text-center mb-8">
                  <div className="w-32 h-32 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-4 border-4 border-gold">
                    <span className="text-5xl">🇧🇷</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Maria Silva</h3>
                  <p className="text-gold font-semibold">Deputada Federal</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-primary-foreground/10 rounded-lg">
                    <span className="text-sm">Partido</span>
                    <span className="font-bold text-gold">PL</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary-foreground/10 rounded-lg">
                    <span className="text-sm">Estado</span>
                    <span className="font-bold text-green-brazil-light">Santa Catarina</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary-foreground/10 rounded-lg">
                    <span className="text-sm">Mandato</span>
                    <span className="font-bold">2023-2027</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-brazil/20 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
