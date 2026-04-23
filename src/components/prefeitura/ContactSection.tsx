import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, MessageCircle } from "lucide-react";
import { useSiteContact } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const WHATSAPP_REGEX = /^\(\d{2}\)\s\d{5}-\d{4}$/;

const formatPhone = (value: string) => {
  let v = value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 0) v = "(" + v;
  if (v.length > 3) v = v.slice(0, 3) + ") " + v.slice(3);
  if (v.length > 10) v = v.slice(0, 10) + "-" + v.slice(10);
  return v;
};

// Cidades de Santa Catarina (lista principal)
const CIDADES_SC = [
  "Florianópolis", "Joinville", "Blumenau", "São José", "Chapecó", "Itajaí",
  "Criciúma", "Jaraguá do Sul", "Lages", "Palhoça", "Balneário Camboriú",
  "Brusque", "Tubarão", "São Bento do Sul", "Caçador", "Canoinhas",
  "Concórdia", "Camboriú", "Navegantes", "Rio do Sul", "Mafra", "Indaial",
  "Araranguá", "Içara", "Gaspar", "Biguaçu", "Itapema", "Videira",
  "Curitibanos", "São Francisco do Sul", "Laguna", "Imbituba", "Joaçaba",
  "Xanxerê", "Três Barras", "Porto União", "Outra cidade",
];

const ContactSection = () => {
  const { toast } = useToast();
  const { data: contact } = useSiteContact();
  const [submitting, setSubmitting] = useState(false);
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cidade, setCidade] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      toast({ title: "Nome obrigatório", variant: "destructive" });
      return;
    }
    if (!WHATSAPP_REGEX.test(whatsapp)) {
      toast({ title: "WhatsApp inválido", description: "Ex: (47) 99999-9999", variant: "destructive" });
      return;
    }
    if (!cidade) {
      toast({ title: "Selecione sua cidade", variant: "destructive" });
      return;
    }
    if (!dataNascimento) {
      toast({ title: "Informe sua data de nascimento", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await db.from("contact_messages").insert({
        nome: nome.trim().slice(0, 120),
        whatsapp,
        cidade,
        data_nascimento: dataNascimento,
      });
      if (error) throw error;
      toast({ title: "Cadastro enviado!", description: "Obrigada pelo seu contato." });
      setNome(""); setWhatsapp(""); setCidade(""); setDataNascimento("");
    } catch {
      toast({ title: "Erro", description: "Não foi possível enviar.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  const channelTitle = contact?.whatsapp_channel_title?.trim() || "Entre em meu canal no WhatsApp";
  const channelSubtitle = contact?.whatsapp_channel_subtitle?.trim() || "e fique por dentro de todas as novidades!";
  const channelButton = contact?.whatsapp_channel_button_text?.trim() || "Entrar no canal";
  const channelUrl = contact?.whatsapp_channel_url?.trim();

  return (
    <section id="contato" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wider mb-4">CONTATO</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fale Conosco</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Cadastre-se e fique por dentro de tudo!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="font-semibold">Nome Completo *</Label>
                  <Input id="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" required maxLength={120} className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="font-semibold">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="(47) 99999-9999"
                    required
                    className="h-12"
                    value={whatsapp}
                    onChange={e => setWhatsapp(formatPhone(e.target.value))}
                    maxLength={15}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade" className="font-semibold">Cidade (Santa Catarina) *</Label>
                  <Select value={cidade} onValueChange={setCidade} required>
                    <SelectTrigger className="h-12 bg-background"><SelectValue placeholder="Selecione sua cidade" /></SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50 max-h-72">
                      {CIDADES_SC.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data_nascimento" className="font-semibold">Data de Nascimento *</Label>
                  <Input
                    id="data_nascimento"
                    type="date"
                    value={dataNascimento}
                    onChange={e => setDataNascimento(e.target.value)}
                    required
                    max={new Date().toISOString().slice(0, 10)}
                    className="h-12"
                  />
                </div>
                <Button type="submit" disabled={submitting} className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 font-semibold">
                  {submitting ? "Enviando..." : <span className="flex items-center gap-2"><Send className="h-5 w-5" /> Enviar Cadastro</span>}
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="bg-muted rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Telefone</h4>
                    <p className="text-muted-foreground text-sm">{contact?.phone || "(47) 3621-7705"}</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="bg-primary rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-3 mb-2">
                <MessageCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <h3 className="text-xl font-bold text-primary-foreground">{channelTitle}</h3>
              </div>
              <p className="text-primary-foreground/80 text-sm mb-4 ml-9">{channelSubtitle}</p>
              {channelUrl ? (
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 font-semibold">
                  <a href={channelUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" /> {channelButton}
                  </a>
                </Button>
              ) : (
                <Button disabled className="w-full bg-secondary/50 text-secondary-foreground h-12 font-semibold">
                  {channelButton} (link não configurado)
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
