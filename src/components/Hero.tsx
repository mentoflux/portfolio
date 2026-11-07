import React from 'react';
import { ArrowDown, Linkedin, Mail, Code2, Layers, Cpu } from 'lucide-react';
import { WebsiteSettings } from '../types/portfolio';
import { resolveImageUrl } from '../utils/imageUtils';

interface HeroProps {
  settings: WebsiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-20 pb-10 sm:pt-28 sm:pb-16 overflow-hidden bg-gradient-to-b from-[#FAF9FF] via-[#F4F0FF] to-[#FAF9FF]"
    >
      {/* Subtle ambient light shapes */}
      <div
        className="absolute top-8 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#A78BFA]/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-6 right-1/4 w-72 sm:w-[32rem] h-72 sm:h-[32rem] bg-[#542C91]/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#542C91]">
                {settings.heroSubheadline || "CA Student · AI Enthusiast · Vibe Coder · Web Developer"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#191624] tracking-tight leading-[1.18] sm:leading-[1.14] mb-3.5 sm:mb-5 [text-wrap:balance]">
              {settings.heroHeadline || "Building Ideas Into Digital Experiences."}
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              {settings.heroDescription ||
                "I'm a CA student with a passion for AI, vibe coding, and building useful digital products. I love turning ideas into interactive websites, tools, and applications."}
            </p>

            {/* Action Buttons & Socials */}
            <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
              <a
                href="#projects"
                className="px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#542C91] rounded-xl hover:bg-[#432373] shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center gap-2 group whitespace-nowrap"
              >
                <span>Explore My Projects</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold text-[#542C91] bg-white border border-[#542C91]/20 rounded-xl hover:bg-purple-50/50 shadow-xs transition-all duration-200 whitespace-nowrap"
              >
                Let's Connect
              </a>

              <div className="flex items-center gap-2 ml-1 sm:ml-2 border-l border-slate-200 pl-3">
                <a
                  href={settings.linkedin || "https://linkedin.com/in/hamza-saif"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#542C91] hover:border-[#542C91]/40 flex items-center justify-center transition-colors shadow-2xs"
                  aria-label="Hamza Saif on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${settings.email || 'hsaif9240@gmail.com'}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#542C91] hover:border-[#542C91]/40 flex items-center justify-center transition-colors shadow-2xs"
                  aria-label="Email Hamza Saif"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Key Value Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 sm:pt-6 border-t border-slate-200/80">
              {(settings.stats && settings.stats.length > 0 ? settings.stats : [
                { label: "Chartered Accountancy", value: "CAF Level" },
                { label: "Tech Focus", value: "AI & Full-Stack" },
                { label: "Community", value: "500+ Peers" },
                { label: "Methodology", value: "Vibe Coded" }
              ]).map((st, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[11px] text-slate-500 font-medium">{st.label}</span>
                  <span className="text-xs sm:text-sm font-bold text-[#191624] tracking-tight">{st.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Profile Presentation Card */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[260px] sm:max-w-sm lg:max-w-md">
              
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#542C91] via-[#A78BFA] to-[#D4AF73] rounded-3xl opacity-25 blur-md" />

              {/* Main Card */}
              <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-lg border border-slate-200/80 overflow-hidden">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 mb-3">
                  <img
                    src={resolveImageUrl(settings.avatarUrl, './images/hamza_saif_portrait_1794068197910.jpg')}
                    alt="Hamza Saif"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (!img.src.includes('images/hamza_saif_portrait')) {
                        img.src = './images/hamza_saif_portrait_1794068197910.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating card caption */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <p className="font-bold text-sm sm:text-base leading-tight">Hamza Saif</p>
                    <p className="text-[10px] sm:text-xs text-slate-200">ICAP CAF Aspirant & Digital Builder</p>
                  </div>
                </div>

                {/* Sub-card feature highlights */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] sm:text-xs">
                  <div className="p-2 rounded-xl bg-purple-50/70 text-slate-800 flex flex-col items-center gap-0.5">
                    <Code2 className="w-3.5 h-3.5 text-[#542C91]" />
                    <span className="font-semibold">Web Apps</span>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-50/70 text-slate-800 flex flex-col items-center gap-0.5">
                    <Cpu className="w-3.5 h-3.5 text-[#542C91]" />
                    <span className="font-semibold">AI Tools</span>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-50/70 text-slate-800 flex flex-col items-center gap-0.5">
                    <Layers className="w-3.5 h-3.5 text-[#542C91]" />
                    <span className="font-semibold">Finance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
