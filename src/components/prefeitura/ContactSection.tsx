import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useSiteContact } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: contact } = useSiteContact();
  const [newsletterContact, setNewsletterContact] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({ title: "Mensagem enviada!", description: "Agradecemos seu contato. Retornaremos em breve." });
    setIsSubmitting(false);
  };

  const isWhatsApp = (value: string) => /^\+?\d[\d\s()-]{7,}$/.test(value.trim());

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = newsletterContact.trim();
    if (!val) return;
    setSubscribing(true);
    try {
      const isPhone = isWhatsApp(val);
      const insertData = isPhone
        ? { email: `whatsapp:${val}`, whatsapp: val }
        : { email: val };

      const { error } = await db.from("newsletter_subscribers").insert(insertData);
      if (error) {
        if (error.code === "23505") {
          toast({ title: "Já inscrito!", description: "Este contato já está cadastrado." });
        } else {
          throw error;
        }
      } else {
        toast({ title: "Inscrito com sucesso!", description: isPhone ? "Você receberá novidades pelo WhatsApp." : "Você receberá nossas novidades por e-mail." });
        setNewsletterContact("");
      }
    } catch {
      toast({ title: "Erro", description: "Não foi possível realizar a inscrição.", variant: "destructive" });
    }
    setSubscribing(false);
  };

  return (
    <section id="contato" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wider mb-4">CONTATO</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fale Conosco</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Sua opinião é importante! Entre em contato conosco.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="nome" className="font-semibold">Nome Completo *</Label><Input id="nome" placeholder="Seu nome" required className="h-12" /></div>
                  <div className="space-y-2"><Label htmlFor="email" className="font-semibold">E-mail *</Label><Input id="email" type="email" placeholder="seu@email.com" required className="h-12" /></div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assunto" className="font-semibold">Assunto *</Label>
                  <Select required><SelectTrigger className="h-12 bg-background"><SelectValue placeholder="Selecione o assunto" /></SelectTrigger><SelectContent className="bg-background border border-border z-50"><SelectItem value="sugestao">Sugestão</SelectItem><SelectItem value="reclamacao">Reclamação</SelectItem><SelectItem value="elogio">Elogio</SelectItem><SelectItem value="duvida">Dúvida</SelectItem><SelectItem value="audiencia">Solicitar Audiência</SelectItem><SelectItem value="outro">Outro</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2"><Label htmlFor="mensagem" className="font-semibold">Mensagem *</Label><Textarea id="mensagem" placeholder="Escreva sua mensagem aqui..." required className="min-h-[150px] resize-none" /></div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 font-semibold">
                  {isSubmitting ? <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Enviando...</span> : <span className="flex items-center gap-2"><Send className="h-5 w-5" /> Enviar Mensagem</span>}
                </Button>
              </div>
            </form>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-6 bg-primary rounded-xl p-6">
              <h3 className="text-lg font-bold text-primary-foreground mb-2">Receba Novidades</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">Cadastre seu e-mail ou WhatsApp para receber as últimas notícias.</p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <Input
                  type="text"
                  required
                  value={newsletterContact}
                  onChange={e => setNewsletterContact(e.target.value)}
                  placeholder="E-mail ou WhatsApp"
                  className="flex-1 h-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button type="submit" disabled={subscribing} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">{subscribing ? "..." : "Inscrever"}</Button>
              </form>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="bg-muted rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-primary" /></div>
                  <div><h4 className="font-semibold text-foreground mb-1">Endereço</h4><p className="text-muted-foreground text-sm">{contact?.address || "Rua Felipe Schmidt, 10 - Centro, Canoinhas - SC"}</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-secondary" /></div>
                  <div><h4 className="font-semibold text-foreground mb-1">Telefone</h4><p className="text-muted-foreground text-sm">{contact?.phone || "(47) 3621-7705"}</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-accent" /></div>
                  <div><h4 className="font-semibold text-foreground mb-1">E-mail</h4><p className="text-muted-foreground text-sm">{contact?.email || "gabinete@canoinhas.sc.gov.br"}</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5 text-primary" /></div>
                  <div><h4 className="font-semibold text-foreground mb-1">Horário</h4><p className="text-muted-foreground text-sm">{contact?.working_hours || "Segunda a Sexta: 8h às 17h"}</p></div>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-2xl h-64 overflow-hidden border border-border">
              {contact?.map_embed_url ? (
                <iframe src={contact.map_embed_url} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa da Prefeitura" />
              ) : (
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14262.927040811847!2d-50.39629!3d-26.17726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94de90e0a7b7e3ed%3A0x3a530df4b5c8b5e1!2sPrefeitura%20Municipal%20de%20Canoinhas!5e0!3m2!1spt-BR!2sbr!4v1700000000000" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa da Prefeitura" />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
