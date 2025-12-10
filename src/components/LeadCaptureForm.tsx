import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { brazilStates, citiesByState } from "@/data/brazilLocations";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const LeadCaptureForm = () => {
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setCities(citiesByState[value] || []);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Em breve entraremos em contato.",
    });
    
    setIsSubmitting(false);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  return (
    <section id="contato" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-brazil/10 text-green-brazil rounded-full text-sm font-semibold tracking-wider mb-4">
              PARTICIPE
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              QUERO OUVIR <span className="text-gold">VOCÊ!</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Compartilhe suas demandas, ideias e sugestões. Sua voz é fundamental
              para construirmos um Brasil melhor.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-xl p-6 md:p-10 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome Completo */}
              <div className="space-y-2">
                <Label htmlFor="nome" className="font-semibold">
                  Nome Completo *
                </Label>
                <Input
                  id="nome"
                  placeholder="Seu nome completo"
                  required
                  className="h-12"
                />
              </div>

              {/* Celular */}
              <div className="space-y-2">
                <Label htmlFor="celular" className="font-semibold">
                  Celular (WhatsApp) *
                </Label>
                <Input
                  id="celular"
                  placeholder="(00) 00000-0000"
                  required
                  className="h-12"
                  onChange={(e) => {
                    e.target.value = formatPhone(e.target.value);
                  }}
                  maxLength={15}
                />
              </div>

              {/* Data de Nascimento */}
              <div className="space-y-2">
                <Label htmlFor="nascimento" className="font-semibold">
                  Data de Nascimento *
                </Label>
                <Input
                  id="nascimento"
                  type="date"
                  required
                  className="h-12"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="h-12"
                />
              </div>

              {/* Estado */}
              <div className="space-y-2">
                <Label htmlFor="estado" className="font-semibold">
                  Estado *
                </Label>
                <Select onValueChange={handleStateChange} required>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="Selecione seu estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    {brazilStates.map((state) => (
                      <SelectItem key={state.uf} value={state.uf}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cidade */}
              <div className="space-y-2">
                <Label htmlFor="cidade" className="font-semibold">
                  Cidade *
                </Label>
                <Select disabled={!selectedState} required>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue
                      placeholder={
                        selectedState
                          ? "Selecione sua cidade"
                          : "Primeiro selecione o estado"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50 max-h-60">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* CEP */}
              <div className="space-y-2">
                <Label htmlFor="cep" className="font-semibold">
                  CEP
                </Label>
                <Input
                  id="cep"
                  placeholder="00000-000"
                  className="h-12"
                  maxLength={9}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    e.target.value = value.replace(/(\d{5})(\d{3})/, "$1-$2");
                  }}
                />
              </div>

              {/* Bairro */}
              <div className="space-y-2">
                <Label htmlFor="bairro" className="font-semibold">
                  Bairro
                </Label>
                <Input
                  id="bairro"
                  placeholder="Seu bairro"
                  className="h-12"
                />
              </div>

              {/* Endereço */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="endereco" className="font-semibold">
                  Endereço
                </Label>
                <div className="flex gap-4">
                  <Input
                    id="endereco"
                    placeholder="Rua, Avenida..."
                    className="h-12 flex-1"
                  />
                  <Input
                    id="numero"
                    placeholder="Nº"
                    className="h-12 w-24"
                  />
                </div>
              </div>

              {/* Mensagem */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="mensagem" className="font-semibold">
                  Compartilhe suas ideias e demandas *
                </Label>
                <Textarea
                  id="mensagem"
                  placeholder="Escreva aqui suas sugestões, reclamações ou ideias para melhorarmos nosso país..."
                  required
                  className="min-h-[120px] resize-none"
                />
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-dark text-foreground font-bold text-lg h-14 shadow-gold hover:shadow-gold-lg transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    CONCLUIR CADASTRO
                  </span>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
