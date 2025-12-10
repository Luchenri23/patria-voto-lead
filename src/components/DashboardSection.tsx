import { motion } from "framer-motion";
import { FileText, Users, Building } from "lucide-react";

const DashboardSection = () => {
  const stats = [
    {
      icon: FileText,
      number: 47,
      label: "Propostas Legislativas",
      description: "Projetos de lei apresentados",
      color: "gold",
    },
    {
      icon: Users,
      number: 12,
      label: "Frentes Parlamentares",
      description: "Frentes em que participo",
      color: "green-brazil",
    },
    {
      icon: Building,
      number: 5,
      label: "Comissões Permanentes",
      description: "Atuação em comissões",
      color: "navy",
    },
  ];

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
          <span className="inline-block px-4 py-2 bg-navy/10 text-navy rounded-full text-sm font-semibold tracking-wider mb-4">
            ATUAÇÃO PARLAMENTAR
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            NÚMEROS QUE <span className="text-gold">FALAM</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Transparência total sobre minha atuação no Congresso Nacional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-8 shadow-lg hover-lift border border-border text-center group"
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                  stat.color === "gold"
                    ? "bg-gold/10 text-gold"
                    : stat.color === "green-brazil"
                    ? "bg-green-brazil/10 text-green-brazil"
                    : "bg-navy/10 text-navy"
                }`}
              >
                <stat.icon className="w-8 h-8" />
              </div>
              <div
                className={`text-5xl font-black mb-2 ${
                  stat.color === "gold"
                    ? "text-gold"
                    : stat.color === "green-brazil"
                    ? "text-green-brazil"
                    : "text-navy"
                }`}
              >
                {stat.number}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {stat.label}
              </h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
