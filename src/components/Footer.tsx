import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Quem sou", href: "#sobre" },
    { label: "Meu trabalho", href: "#trabalho" },
    { label: "Notícias", href: "#noticias" },
    { label: "Downloads", href: "#downloads" },
    { label: "Contato", href: "#contato" },
  ];

  const legalLinks = [
    { label: "Política de Privacidade", href: "#" },
    { label: "Termos de Uso", href: "#" },
    { label: "LGPD", href: "#" },
  ];

  return (
    <footer className="bg-navy-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo & Slogan */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-black mb-1">MARIA SILVA</h3>
              <p className="text-gold text-sm font-semibold">
                DEPUTADA FEDERAL • PL/SC
              </p>
            </div>
            <p className="text-primary-foreground/70 mb-6 text-sm leading-relaxed">
              Deus, Pátria, Família. Juntos pela liberdade e soberania do Brasil.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-gold hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-gold hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-gold hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-gold hover:text-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">Navegação</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/70">WhatsApp</p>
                  <a href="tel:+5548999999999" className="text-sm hover:text-gold transition-colors">
                    (48) 99999-9999
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/70">E-mail</p>
                  <a href="mailto:contato@mariasilva.com.br" className="text-sm hover:text-gold transition-colors">
                    contato@mariasilva.com.br
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-primary-foreground/70">Gabinete</p>
                  <p className="text-sm">
                    Câmara dos Deputados, Anexo IV
                    <br />
                    Brasília - DF
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>© 2025 Maria Silva - Deputada Federal. Todos os direitos reservados.</p>
            <p>
              Desenvolvido com ❤️ para o Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
