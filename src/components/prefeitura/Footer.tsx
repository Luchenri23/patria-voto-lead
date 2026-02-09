import { MapPin, Phone, Mail } from "lucide-react";
import { useSiteFooter, useSiteContact, useSiteFooterLinks, useSiteSocialLinks } from "@/hooks/useSiteContent";
import SocialIcon from "@/components/prefeitura/SocialIcon";

const Footer = () => {
  const { data: footer } = useSiteFooter();
  const { data: contact } = useSiteContact();
  const { data: footerLinks } = useSiteFooterLinks();
  const { data: socialLinks } = useSiteSocialLinks();

  const visibleLinks = footerLinks?.filter(l => l.visible) || [];
  const visibleSocial = socialLinks?.filter(l => l.visible) || [];

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Quem Sou", href: "#quem-sou" },
    { label: "Meu Trabalho", href: "#trabalho" },
    { label: "Notícias", href: "#noticias" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1">Juliana Maciel</h3>
              <p className="text-secondary text-sm font-semibold">Prefeita de Canoinhas</p>
            </div>
            <p className="text-primary-foreground/70 mb-6 text-sm leading-relaxed">{footer?.slogan || "Trabalhando por uma Canoinhas melhor para todos."}</p>
            <div className="flex gap-3">
              {visibleSocial.map((link) => (
                <a key={link.id} href={link.url || "#"} className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors" aria-label={link.label} target="_blank" rel="noopener noreferrer">
                  <SocialIcon platform={link.platform} iconUrl={link.icon_url} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">Navegação</h4>
            <ul className="space-y-3">{navLinks.map((link) => <li key={link.label}><a href={link.href} className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">{link.label}</a></li>)}</ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">Transparência</h4>
            <ul className="space-y-3">
              {visibleLinks.map((link) => (
                <li key={link.id}><a href={link.url || "#"} className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">{link.label}</a></li>
              ))}
            </ul>
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
