import { MapPin, Phone, Mail } from "lucide-react";
import { useSiteFooter, useSiteContact, useSiteFooterLinks, useSiteSocialLinks, useSiteHeader } from "@/hooks/useSiteContent";
import SocialIcon from "@/components/prefeitura/SocialIcon";

const Footer = () => {
  const { data: footer, isLoading: footerLoading } = useSiteFooter();
  const { data: contact, isLoading: contactLoading } = useSiteContact();
  const { data: footerLinks } = useSiteFooterLinks();
  const { data: socialLinks } = useSiteSocialLinks();
  const { data: header } = useSiteHeader();

  const isLoading = footerLoading || contactLoading;

  const visibleLinks = footerLinks?.filter(l => l.visible) || [];
  const visibleSocial = socialLinks?.filter(l => l.visible) || [];

  const hasAddress = !!contact?.address?.trim();
  const hasPhone = !!contact?.phone?.trim();
  const hasEmail = !!contact?.email?.trim();
  const hasContact = hasAddress || hasPhone || hasEmail;
  const hasCopyright = !!footer?.copyright_text?.trim();
  const hasGestao = !!(footer as any)?.gestao_text?.trim();
  const hasSlogan = !!footer?.slogan?.trim();
  const hasLogo = !!header?.logo_url || !!header?.logo_text?.trim();

  const hasAnyContent = hasLogo || hasSlogan || visibleSocial.length > 0 || visibleLinks.length > 0 || hasContact || hasCopyright || hasGestao;

  if (isLoading) return null;
  if (!hasAnyContent) return null;

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Quem Sou", href: "#quem-sou" },
    { label: "Projetos", href: "#trabalho" },
    { label: "Notícias", href: "#noticias" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {(hasLogo || hasSlogan || visibleSocial.length > 0) && (
            <div>
              <div className="mb-6">
                {header?.logo_url ? (
                  <img src={header.logo_url} alt={header?.logo_text || "Logo"} className="h-12 w-auto mb-2" />
                ) : header?.logo_text?.trim() ? (
                  <>
                    <h3 className="text-xl font-bold mb-1">{header.logo_text}</h3>
                    {header?.logo_subtitle?.trim() && <p className="text-secondary text-sm font-semibold">{header.logo_subtitle}</p>}
                  </>
                ) : null}
              </div>
              {hasSlogan && <p className="text-primary-foreground/70 mb-6 text-sm leading-relaxed">{footer!.slogan}</p>}
              {visibleSocial.length > 0 && (
                <div className="flex gap-3">
                  {visibleSocial.map((link) => (
                    <a key={link.id} href={link.url || "#"} className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors" aria-label={link.label} target="_blank" rel="noopener noreferrer">
                      <SocialIcon platform={link.platform} iconUrl={link.icon_url} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="hidden sm:block">
            <h4 className="text-lg font-bold mb-6 text-secondary">Navegação</h4>
            <ul className="space-y-3">{navLinks.map((link) => <li key={link.label}><a href={link.href} className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">{link.label}</a></li>)}</ul>
          </div>

          {visibleLinks.length > 0 && (
            <div>
              <h4 className="text-lg font-bold mb-6 text-secondary">Transparência</h4>
              <ul className="space-y-3">
                {visibleLinks.map((link) => (
                  <li key={link.id}><a href={link.url || "#"} className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">{link.label}</a></li>
                ))}
              </ul>
            </div>
          )}

          {hasContact && (
            <div>
              <h4 className="text-lg font-bold mb-6 text-secondary">Contato</h4>
              <ul className="space-y-4">
                {hasAddress && <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-1" /><span className="text-primary-foreground/70 text-sm">{contact!.address}</span></li>}
                {hasPhone && <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-secondary flex-shrink-0" /><span className="text-primary-foreground/70 text-sm">{contact!.phone}</span></li>}
                {hasEmail && <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-secondary flex-shrink-0" /><a href={`mailto:${contact!.email.trim()}`} className="text-primary-foreground/70 text-sm hover:text-secondary transition-colors">{contact!.email.trim()}</a></li>}
              </ul>
            </div>
          )}
        </div>
      </div>

      {(hasCopyright || hasGestao) && (
        <div className="border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
              {hasCopyright && <p>{footer!.copyright_text}</p>}
              {hasGestao && <p>{(footer as any).gestao_text}</p>}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
