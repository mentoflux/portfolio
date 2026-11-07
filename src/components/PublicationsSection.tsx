import React, { useState } from 'react';
import { BookOpen, ExternalLink, FileText, X } from 'lucide-react';
import { Publication } from '../types/portfolio';

interface PublicationsProps {
  publications: Publication[];
}

export const PublicationsSection: React.FC<PublicationsProps> = ({ publications }) => {
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);

  return (
    <section id="publications" className="py-14 sm:py-20 bg-[#FAF9FF] relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#542C91] mb-1.5 block">
            Authored Guides & Resources
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191624] tracking-tight">
            Publications & Notes
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
            Educational resources, study manuals, and reference notes authored to help students master communication and academic curricula.
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="flex flex-col sm:flex-row bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-lg hover:border-[#542C91]/30 transition-all duration-300"
            >
              {/* Publication Cover Image / Icon */}
              <div className="sm:w-40 bg-gradient-to-br from-[#542C91]/5 to-[#A78BFA]/10 flex items-center justify-center p-4 sm:p-5 shrink-0 border-b sm:border-b-0 sm:border-r border-slate-100">
                {pub.coverImage ? (
                  <img
                    src={pub.coverImage}
                    alt={pub.title}
                    className="w-24 h-32 sm:w-28 sm:h-38 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-24 h-32 sm:w-28 sm:h-38 rounded-lg bg-white border border-[#542C91]/20 flex flex-col items-center justify-center text-center p-3 shadow-2xs">
                    <BookOpen className="w-6 h-6 text-[#542C91] mb-1.5" />
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">
                      {pub.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Publication Content */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#542C91] mb-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Academic Reference</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#191624] mb-2 leading-snug">
                    {pub.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 line-clamp-3">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-slate-400">
                    Self-Authored Material
                  </span>

                  <button
                    onClick={() => setSelectedPub(pub)}
                    className="inline-flex items-center gap-1 font-semibold text-[#542C91] hover:text-[#432373] cursor-pointer"
                  >
                    <span>Read Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Publication Modal */}
      {selectedPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-2xs animate-fadeIn">
          <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-slate-100">
            <button
              onClick={() => setSelectedPub(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:text-black flex items-center justify-center cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              {selectedPub.coverImage ? (
                <img
                  src={selectedPub.coverImage}
                  alt={selectedPub.title}
                  className="w-14 h-20 object-cover rounded-lg shadow-sm"
                />
              ) : (
                <div className="w-12 h-16 rounded-lg bg-purple-100 text-[#542C91] flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
              )}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#542C91]">
                  Self-Authored Resource
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#191624]">
                  {selectedPub.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 whitespace-pre-line">
              {selectedPub.description}
            </p>

            <div className="p-3.5 rounded-xl bg-[#FAF9FF] border border-slate-200/80 mb-4 text-xs text-slate-600">
              <p className="font-semibold text-slate-800 mb-0.5">Target Audience & Purpose:</p>
              <p>Designed for ICAP students and secondary education candidates seeking concise, systematic explanations and focused practice material.</p>
            </div>

            {selectedPub.externalUrl ? (
              <a
                href={selectedPub.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#542C91] text-white text-xs sm:text-sm font-semibold hover:bg-[#432373] transition-colors"
              >
                <span>Access Resource Notes</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <div className="text-center text-xs text-slate-500">
                Shared upon request with student study communities and peer groups.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
