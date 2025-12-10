import { Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-navy-dark text-primary-foreground py-2 px-4">
      <div className="container mx-auto flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gold" />
          <a href="tel:+5548999999999" className="hover:text-gold transition-colors">
            (48) 99999-9999
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gold transition-colors" aria-label="Facebook">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="hover:text-gold transition-colors" aria-label="Twitter">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="hover:text-gold transition-colors" aria-label="YouTube">
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
