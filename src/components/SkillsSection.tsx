import React from 'react';
import { Code, Bot, TrendingUp, DollarSign, Users, CheckCircle2 } from 'lucide-react';
import { Skill } from '../types/portfolio';

interface SkillsProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsProps> = ({ skills }) => {
  const categoryConfig: Record<string, { label: string; icon: React.ElementType; desc: string }> = {
    Development: {
      label: 'Web Development & Apps',
      icon: Code,
      desc: 'Frontend engineering, clean responsive code, and interactive web architecture.'
    },
    'AI & Tools': {
      label: 'Artificial Intelligence & Vibe Coding',
      icon: Bot,
      desc: 'LLM orchestration, prompt frameworks, and rapid product iteration.'
    },
    'Marketing & SEO': {
      label: 'Search Strategy & Digital Growth',
      icon: TrendingUp,
      desc: 'Search engine optimization, keyword intent, and digital content reach.'
    },
    'Finance & Business': {
      label: 'Accounting & Quantitative Finance',
      icon: DollarSign,
      desc: 'Financial analysis, reporting frameworks, and spreadsheet modeling.'
    },
    Leadership: {
      label: 'Leadership & Mentorship',
      icon: Users,
      desc: 'Community building, public speaking, and student academic guidance.'
    }
  };

  const categories = ['Development', 'AI & Tools', 'Marketing & SEO', 'Finance & Business', 'Leadership'] as const;

  return (
    <section id="skills" className="py-14 sm:py-20 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#542C91] mb-1.5 block">
            Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191624] tracking-tight">
            Skills & Competencies
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
            A cohesive blend of technological fluency, financial acumen, and digital marketing capabilities.
          </p>
        </div>

        {/* Categorized Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((catKey) => {
            const config = categoryConfig[catKey];
            const categorySkills = skills.filter((s) => s.category === catKey);
            if (categorySkills.length === 0) return null;
            const Icon = config.icon;

            return (
              <div
                key={catKey}
                className="p-4 sm:p-6 rounded-2xl bg-[#FAF9FF] border border-slate-200/80 hover:border-[#542C91]/30 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-[#542C91]/15 text-[#542C91] flex items-center justify-center shadow-2xs shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#191624] leading-tight">
                        {config.label}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {config.desc}
                  </p>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/50">
                  {categorySkills.map((sk) => (
                    <span
                      key={sk.id}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200/80 px-2.5 py-1 rounded-lg shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#542C91]" />
                      <span>{sk.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
