import React from 'react';
import { Linkedin, Mail, Shield, ArrowUp } from 'lucide-react';
import { WebsiteSettings } from '../types/portfolio';

interface FooterProps {
  settings: WebsiteSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1b0e33] text-white py-10 sm:py-14 relative overflow-hidden">
      {/* Decorative ambient light */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#A78BFA]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 pb-6 sm:pb-10 border-b border-white/10">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-extrabold text-sm">
              HS
            </span>
            <div>
              <p className="font-bold text-white text-base">Hamza Saif</p>
              <p className="text-xs text-purple-200/70">CA Student · AI Enthusiast · Web Developer</p>
            </div>
          </div>

          {/* Nav / Socials */}
          <div className="flex items-center gap-4">
            <a
              href={settings.linkedin || "https://linkedin.com/in/hamza-saif"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-purple-200 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${settings.email || 'hsaif9240@gmail.com'}`}
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-purple-200 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-purple-200 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors ml-2"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Lower Row: Copyright, note, and subtle discrete Admin link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-200/60">
          <p>© {currentYear} Hamza Saif. All rights reserved.</p>
          
          <p className="flex items-center gap-1">
            <span>Built with curiosity and AI ✦</span>
          </p>

          {/* Discrete subtle admin trigger */}
          <button
            onClick={onOpenAdmin}
            className="text-purple-300/40 hover:text-purple-200 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
            title="Dashboard Portal"
          >
            <Shield className="w-3 h-3" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
