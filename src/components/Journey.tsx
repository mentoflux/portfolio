import React from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';
import { Education, Experience } from '../types/portfolio';

interface JourneyProps {
  education: Education[];
  experience: Experience[];
}

export const Journey: React.FC<JourneyProps> = ({ education, experience }) => {
  return (
    <section id="journey" className="py-14 sm:py-20 bg-[#FAF9FF] relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#542C91] mb-1.5 block">
            Academic & Professional Path
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191624] tracking-tight">
            Education & Experience
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
            A chronological timeline of professional qualifications, academic foundations, and community leadership.
          </p>
        </div>

        {/* 2-Column Split: Education on Left, Experience on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          
          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-100 text-[#542C91] flex items-center justify-center shadow-2xs shrink-0">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#191624]">
                Education
              </h3>
            </div>

            <div className="relative pl-5 sm:pl-8 border-l-2 border-purple-200 space-y-6 sm:space-y-8">
              {education.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Timeline dot */}
                  <span className="absolute -left-[27px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white border-[3px] sm:border-4 border-[#542C91] shadow-2xs group-hover:scale-125 transition-transform" />

                  <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#542C91] bg-purple-50 px-2.5 py-0.5 sm:py-1 rounded-md inline-block mb-1.5">
                      {item.period}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#191624] mb-0.5">
                      {item.degree}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      {item.institution}
                    </p>
                    {item.description && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-100 text-[#542C91] flex items-center justify-center shadow-2xs shrink-0">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#191624]">
                Experience & Leadership
              </h3>
            </div>

            <div className="relative pl-5 sm:pl-8 border-l-2 border-purple-200 space-y-6 sm:space-y-8">
              {experience.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Timeline dot */}
                  <span className="absolute -left-[27px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white border-[3px] sm:border-4 border-[#A78BFA] shadow-2xs group-hover:scale-125 transition-transform" />

                  <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#542C91] bg-purple-50 px-2.5 py-0.5 sm:py-1 rounded-md inline-block mb-1.5">
                      {item.period}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#191624] mb-0.5">
                      {item.role}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-slate-700 mb-2">
                      {item.organization}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
