import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteHeader, useSiteSocialLinks } from "@/hooks/useSiteContent";
import SocialIcon from "@/components/prefeitura/SocialIcon";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: header } = useSiteHeader();
  const { data: socialLinks } = useSiteSocialLinks();

  const visibleSocial = socialLinks?.filter(l => l.visible) || [];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Quem Sou", href: "#quem-sou" },
    { label: "Meu Trabalho", href: "#trabalho" },
    { label: "Notícias", href: "#noticias" },
    { label: "Artigos", href: "#artigos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft py-3" : "bg-transparent py-4"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            {header?.logo_url ? (
              <img src={header.logo_url} alt={header?.logo_text || "Logo"} className="h-10 md:h-12 w-auto transition-all" />
            ) : (
              <div className="flex flex-col">
                <span className={`text-lg md:text-xl font-bold transition-colors ${isScrolled ? "text-primary" : "text-primary-foreground"}`}>
                  {header?.logo_text || "Juliana Maciel"}
                </span>
                <span className={`text-xs font-medium tracking-wider transition-colors ${isScrolled ? "text-secondary" : "text-secondary"}`}>
                  {header?.logo_subtitle?.toUpperCase() || "PREFEITA DE CANOINHAS"}
                </span>
              </div>
            )}
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full ${isScrolled ? "text-foreground hover:text-secondary" : "text-primary-foreground/90 hover:text-primary-foreground"}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              {visibleSocial.map((link) => (
                <a key={link.id} href={link.url || "#"} className={`p-2 rounded-full transition-colors ${isScrolled ? "text-muted-foreground hover:text-secondary hover:bg-secondary/10" : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"}`} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                  <SocialIcon platform={link.platform} iconUrl={link.icon_url} className="w-4 h-4" />
                </a>
              ))}
            </div>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold" asChild>
              <a href={header?.cta_link || "#contato"}>{header?.cta_text || "Fale Conosco"}</a>
            </Button>
          </div>

          <button className={`lg:hidden p-2 ${isScrolled ? "text-primary" : "text-primary-foreground"}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border/20 pt-4 animate-fade-in-up bg-background rounded-lg p-4 shadow-lg">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="text-sm font-medium text-foreground hover:text-secondary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-3 py-2">
                {visibleSocial.map((link) => (
                  <a key={link.id} href={link.url || "#"} className="text-muted-foreground hover:text-secondary" target="_blank" rel="noopener noreferrer">
                    <SocialIcon platform={link.platform} iconUrl={link.icon_url} className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full mt-2" asChild>
                <a href={header?.cta_link || "#contato"}>{header?.cta_text || "Fale Conosco"}</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
