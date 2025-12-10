import { useState, useEffect } from "react";
import { Menu, X, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Custom TikTok icon since lucide doesn't have one
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col">
            <span className={`text-lg md:text-xl font-bold transition-colors ${
              isScrolled ? "text-primary" : "text-primary-foreground"
            }`}>
              Juliana Maciel
            </span>
            <span className={`text-xs font-medium tracking-wider transition-colors ${
              isScrolled ? "text-secondary" : "text-secondary"
            }`}>
              PREFEITA DE CANOINHAS
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full ${
                  isScrolled 
                    ? "text-foreground hover:text-secondary" 
                    : "text-primary-foreground/90 hover:text-primary-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side - Social + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className={`p-2 rounded-full transition-colors ${
                    isScrolled 
                      ? "text-muted-foreground hover:text-secondary hover:bg-secondary/10" 
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="#"
                className={`p-2 rounded-full transition-colors ${
                  isScrolled 
                    ? "text-muted-foreground hover:text-secondary hover:bg-secondary/10" 
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
            >
              Fale Conosco
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${isScrolled ? "text-primary" : "text-primary-foreground"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border/20 pt-4 animate-fade-in-up bg-background rounded-lg p-4 shadow-lg">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-secondary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-3 py-2">
                <a href="#" className="text-muted-foreground hover:text-secondary"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-muted-foreground hover:text-secondary"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-muted-foreground hover:text-secondary"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-muted-foreground hover:text-secondary"><TikTokIcon className="w-5 h-5" /></a>
              </div>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full mt-2">
                Fale Conosco
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
