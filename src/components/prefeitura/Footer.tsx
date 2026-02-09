import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { useSiteFooter, useSiteContact, useSiteHeader } from "@/hooks/useSiteContent";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  const { data: footer } = useSiteFooter();
  const { data: contact } = useSiteContact();
  const { data: header } = useSiteHeader();

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Quem Sou", href: "#quem-sou" },
    { label: "Meu Trabalho", href: "#trabalho" },
    { label: "Notícias", href: "#noticias" },
    { label: "Artigos", href: "#artigos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Contato", href: "#contato" },
  ];

  const legalLinks = [
    { label: "Portal da Transparência", href: footer?.transparency_url || "#" },
    { label: "Política de Privacidade", href: footer?.privacy_url || "#" },
    { label: "Lei de Acesso à Informação", href: "#" },
    { label: "Ouvidoria", href: "#" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1">{header?.logo_text || "Juliana Maciel"}</h3>
              <p className="text-secondary text-sm font-semibold">{header?.logo_subtitle || "Prefeita de Canoinhas"}</p>
            </div>
            <p className="text-primary-foreground/70 mb-6 text-sm leading-relaxed">{footer?.slogan || "Trabalhando por uma Canoinhas melhor para todos."}</p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: header?.instagram_url || "#", label: "Instagram" },
                { icon: Facebook, href: header?.facebook_url || "#", label: "Facebook" },
                { icon: Twitter, href: header?.twitter_url || "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors" aria-label={label} target="_blank" rel="noopener noreferrer">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a href={header?.tiktok_url || "#"} className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">Navegação</h4>
            <ul className="space-y-3">{navLinks.map((link) => <li key={link.label}><a href={link.href} className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">{link.label}</a></li>)}</ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">Transparência</h4>
            <ul className="space-y-3">{legalLinks.map((link) => <li key={link.label}><a href={link.href} className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">{link.label}</a></li>)}</ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-1" /><span className="text-primary-foreground/70 text-sm">{contact?.address || "Rua Felipe Schmidt, 10 - Centro"}</span></li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-secondary flex-shrink-0" /><span className="text-primary-foreground/70 text-sm">{contact?.phone || "(47) 3621-7705"}</span></li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-secondary flex-shrink-0" /><span className="text-primary-foreground/70 text-sm">{contact?.email || "gabinete@canoinhas.sc.gov.br"}</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>{footer?.copyright_text || "© 2025 Juliana Maciel - Prefeita de Canoinhas. Todos os direitos reservados."}</p>
            <p>Gestão 2025-2028 • Canoinhas/SC</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
