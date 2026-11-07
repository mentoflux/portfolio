import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  availabilityText?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, availabilityText = "Building something interesting ✦" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'about', 'projects', 'certifications', 'journey', 'skills', 'publications', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Journey', href: '#journey' },
    { label: 'Skills', href: '#skills' },
    { label: 'Publications', href: '#publications' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9FF]/90 backdrop-blur-md border-b border-[#542C91]/10 shadow-[0_4px_20px_rgba(84,44,145,0.04)] py-2 sm:py-3'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#home"
              className="group flex items-center gap-2.5 text-slate-900 font-bold text-lg tracking-tight whitespace-nowrap"
            >
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#542C91] to-[#6E3CB8] text-[#FAF9FF] flex items-center justify-center font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
                HS
              </span>
              <span className="text-[#191624] font-semibold text-base hidden sm:inline">
                Hamza Saif
              </span>
            </a>

            {/* Subtle Availability indicator */}
            <span className="hidden xl:inline-flex items-center text-xs font-medium text-[#542C91]/80 pl-2 border-l border-slate-300">
              {availabilityText}
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative py-1 whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'text-[#542C91] font-semibold'
                      : 'hover:text-[#542C91] text-slate-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#542C91] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Admin quick state */}
          <div className="flex items-center gap-3 shrink-0">
            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#542C91] bg-[#542C91]/10 rounded-lg hover:bg-[#542C91]/20 transition-colors whitespace-nowrap"
                title="Admin Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#542C91] rounded-lg hover:bg-[#432373] shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-[#542C91] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-slate-200/60 bg-[#FAF9FF] rounded-2xl shadow-xl px-4 flex flex-col gap-2 animate-fadeIn">
            <div className="text-xs font-medium text-[#542C91] py-1 border-b border-slate-100">
              {availabilityText}
            </div>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="py-2 px-2 text-sm font-medium text-slate-700 hover:text-[#542C91] hover:bg-purple-50/50 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            {isAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="mt-2 text-left py-2 px-2 text-sm font-semibold text-[#542C91] hover:bg-purple-50/50 rounded-lg flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
