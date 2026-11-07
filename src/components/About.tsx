import React from 'react';
import {
  Briefcase,
  Bot,
  Zap,
  Globe,
  TrendingUp,
  Compass
} from 'lucide-react';
import { WebsiteSettings } from '../types/portfolio';

interface AboutProps {
  settings: WebsiteSettings;
}

export const About: React.FC<AboutProps> = ({ settings }) => {
  const interests = [
    {
      title: "Chartered Accountancy & Finance",
      desc: "Financial accounting, corporate taxation, and business management under ICAP CAF curriculum.",
      icon: Briefcase,
    },
    {
      title: "Artificial Intelligence",
      desc: "Prompt engineering, LLM orchestration, and practical AI automation for everyday workflows.",
      icon: Bot,
    },
    {
      title: "Vibe Coding",
      desc: "Fast, intuitive product prototyping and turning creative thoughts into functioning software.",
      icon: Zap,
    },
    {
      title: "Web Development",
      desc: "Modern reactive frontends, responsive design systems, and robust full-stack architectures.",
      icon: Globe,
    },
    {
      title: "SEO & Digital Marketing",
      desc: "Search engine strategy, audience research, content distribution, and organic traffic growth.",
      icon: TrendingUp,
    },
    {
      title: "Entrepreneurship",
      desc: "Building self-sustaining digital tools and student-focused community platforms.",
      icon: Compass,
    }
  ];

  return (
    <section id="about" className="py-14 sm:py-20 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="w-full mb-10 sm:mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#542C91] mb-1.5 block">
            Background & Mindset
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191624] tracking-tight mb-5 sm:mb-6">
            A Little About Me
          </h2>
          
          <div className="w-full space-y-4 text-justify text-sm sm:text-base text-slate-700 leading-relaxed sm:leading-loose">
            {settings.aboutText ? (
              settings.aboutText.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="w-full text-justify hyphens-auto">
                  {paragraph}
                </p>
              ))
            ) : (
              <>
                <p className="w-full text-justify hyphens-auto">
                  I'm Hamza Saif, a Chartered Accountancy student at CAF level, currently pursuing my professional journey through ICAP.
                </p>
                <p className="w-full text-justify hyphens-auto">
                  Beyond accounting and finance, I'm deeply interested in artificial intelligence, vibe coding, web development, and building digital products.
                </p>
                <p className="w-full text-justify hyphens-auto">
                  I enjoy experimenting with AI tools, transforming ideas into working applications, and creating practical solutions for students and professionals.
                </p>
                <p className="w-full text-justify hyphens-auto">
                  My interests lie at the intersection of finance, technology, creativity, and entrepreneurship.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Stats Strip */}
        {settings.stats && settings.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
            {settings.stats.map((st, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#FAF9FF] border border-[#542C91]/10 text-center flex flex-col justify-center"
              >
                <span className="text-sm sm:text-base font-bold text-[#542C91] mb-1">
                  {st.value}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-600 font-medium">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 6 Interest Cards */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#191624] tracking-tight mb-4 sm:mb-6">
            Areas of Focus & Curiosity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {interests.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group p-4 sm:p-6 rounded-2xl bg-[#FAF9FF] border border-[#542C91]/10 hover:border-[#542C91]/30 transition-all duration-200 hover:shadow-md"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-[#542C91]/15 text-[#542C91] flex items-center justify-center mb-3 sm:mb-4 shadow-2xs group-hover:bg-[#542C91] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#191624] mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
