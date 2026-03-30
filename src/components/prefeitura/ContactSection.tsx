import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail } from "lucide-react";
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

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: contact } = useSiteContact();
  const [newsletterContact, setNewsletterContact] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [formPhone, setFormPhone] = useState("");
  const [formAssunto, setFormAssunto] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!WHATSAPP_REGEX.test(formPhone)) {
      toast({ title: "Número inválido", description: "Informe um número válido. Ex: (47) 99999-9999", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const form = e.currentTarget;
      const nome = (form.elements.namedItem("nome") as HTMLInputElement).value.trim();
      const assunto = (form.querySelector("[data-assunto]") as HTMLElement)?.dataset.assuntoValue || "Outro";
      const mensagem = (form.elements.namedItem("mensagem") as HTMLTextAreaElement).value.trim();

      const whatsappNumber = formPhone.replace(/\D/g, "");
      const text = `*Contato pelo site*%0ANome: ${encodeURIComponent(nome)}%0AWhatsApp: ${encodeURIComponent(formPhone)}%0AAssunto: ${encodeURIComponent(assunto)}%0AMensagem: ${encodeURIComponent(mensagem)}`;
      window.open(`https://wa.me/55${whatsappNumber}?text=${text}`, "_blank");

      toast({ title: "Mensagem enviada!", description: "Você será redirecionado ao WhatsApp para finalizar o envio." });
      form.reset();
      setFormPhone("");
    } catch {
      toast({ title: "Erro", description: "Não foi possível enviar a mensagem.", variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = newsletterContact.trim();
    if (!val) return;
    if (!WHATSAPP_REGEX.test(val)) {
      toast({ title: "Número inválido", description: "Informe um número de WhatsApp válido com DDD. Ex: (47) 99999-9999", variant: "destructive" });
      return;
    }
    setSubscribing(true);
    try {
      const { error } = await db.from("newsletter_subscribers").insert({ email: `whatsapp:${val}`, whatsapp: val });
      if (error) {
        if (error.code === "23505") {
          toast({ title: "Já inscrito!", description: "Este número já está cadastrado." });
        } else {
          throw error;
        }
      } else {
        toast({ title: "Inscrito com sucesso!", description: "Você receberá novidades pelo WhatsApp." });
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
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="font-semibold">WhatsApp *</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="(47) 99999-9999"
                      required
                      className="h-12"
                      value={formPhone}
                      onChange={e => setFormPhone(formatPhone(e.target.value))}
                      maxLength={15}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assunto" className="font-semibold">Assunto *</Label>
                  <Select required><SelectTrigger className="h-12 bg-background"><SelectValue placeholder="Selecione o assunto" /></SelectTrigger><SelectContent className="bg-background border border-border z-50"><SelectItem value="sugestao">Sugestão</SelectItem><SelectItem value="reclamacao">Reclamação</SelectItem><SelectItem value="elogio">Elogio</SelectItem><SelectItem value="duvida">Dúvida</SelectItem><SelectItem value="outro">Outro</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2"><Label htmlFor="mensagem" className="font-semibold">Mensagem *</Label><Textarea id="mensagem" placeholder="Escreva sua mensagem aqui..." required className="min-h-[150px] resize-none" /></div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 font-semibold">
                  {isSubmitting ? <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Enviando...</span> : <span className="flex items-center gap-2"><Send className="h-5 w-5" /> Enviar Mensagem</span>}
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="bg-muted rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-secondary" /></div>
                  <div><h4 className="font-semibold text-foreground mb-1">Telefone</h4><p className="text-muted-foreground text-sm">{contact?.phone || "(47) 3621-7705"}</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-accent" /></div>
                  <div><h4 className="font-semibold text-foreground mb-1">E-mail</h4><p className="text-muted-foreground text-sm">{contact?.email?.trim() || "contato@julianamaciel.com"}</p></div>
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="bg-primary rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-primary-foreground mb-2">Receba Novidades</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">Cadastre seu WhatsApp para receber as últimas notícias.</p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <Input
                  type="tel"
                  required
                  value={newsletterContact}
                  onChange={e => setNewsletterContact(formatPhone(e.target.value))}
                  placeholder="(47) 99999-9999"
                  maxLength={15}
                  className="flex-1 h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button type="submit" disabled={subscribing} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-6">{subscribing ? "..." : "Inscrever"}</Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
