import React, { useRef, useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Award,
  ExternalLink,
  ShieldCheck,
  X,
  FileCheck2,
  Building,
  Image as ImageIcon,
  ZoomIn
} from 'lucide-react';
import { Certification } from '../types/portfolio';

interface CertificationsProps {
  certifications: Certification[];
}

export const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Duplicate items for continuous seamless infinite loop
  const displayCerts = [...certifications, ...certifications];

  // Slow continuous smooth scroll animation using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 0.65; // Slow, continuous glide

    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed;
        // If scrolled past halfway (the first set of duplicates), loop back seamlessly
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, certifications.length]);

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <section id="certifications" className="py-14 sm:py-20 bg-white relative border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#542C91] mb-1.5 block">
              Qualifications & Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191624] tracking-tight">
              Certifications & Learning
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-xl">
              Verified certifications, official ICAP credentials, and technical course completions.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={handlePrev}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FAF9FF] border border-slate-200 text-slate-700 hover:text-[#542C91] hover:border-[#542C91]/30 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Previous certificates"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FAF9FF] border border-slate-200 text-slate-700 hover:text-[#542C91] hover:border-[#542C91]/30 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Next certificates"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayCerts.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              onClick={() => setSelectedCert(cert)}
              className="shrink-0 w-[260px] sm:w-[320px] flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#FAF9FF] border border-slate-200/80 hover:border-[#542C91]/40 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div>
                {/* Certificate Picture Thumbnail if available */}
                {cert.certificateImage ? (
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 mb-3.5 border border-slate-200/80 group-hover:border-[#542C91]/30 transition-colors">
                    <img
                      src={cert.certificateImage}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-2xs">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>View Picture</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-purple-50 to-[#FAF9FF] border border-purple-100 mb-3.5 p-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          cert.isQualification ? 'bg-[#542C91] text-white' : 'bg-purple-200 text-[#542C91]'
                        }`}
                      >
                        {cert.isQualification ? <ShieldCheck className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{cert.issueDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-purple-700/80 font-medium">
                      <ImageIcon className="w-3 h-3" />
                      <span>Official Credential</span>
                    </div>
                  </div>
                )}

                {/* Top Badge & Issuer */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <p className="text-[11px] font-bold text-[#542C91] tracking-wide flex items-center gap-1 truncate">
                    <Building className="w-3 h-3 shrink-0" />
                    <span className="truncate">{cert.issuer}</span>
                  </p>
                  <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200/80 px-2 py-0.5 rounded shrink-0">
                    {cert.issueDate}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-[#191624] group-hover:text-[#542C91] transition-colors mb-2.5 line-clamp-2 leading-snug">
                  {cert.title}
                </h3>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {cert.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-slate-600 bg-white border border-slate-200/60 px-1.5 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-[#542C91]">
                <span>{cert.certificateImage ? 'View Certificate Image' : cert.isQualification ? 'Professional Qualification' : 'Verified Credential'}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-slate-100">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  selectedCert.isQualification
                    ? 'bg-[#542C91] text-white'
                    : 'bg-purple-100 text-[#542C91]'
                }`}
              >
                {selectedCert.isQualification ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : (
                  <Award className="w-5 h-5" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-[#542C91] truncate">
                  {selectedCert.issuer}
                </p>
                <p className="text-xs text-slate-500">{selectedCert.issueDate}</p>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#191624] mb-3">
              {selectedCert.title}
            </h3>

            {/* Certificate Picture inside modal */}
            {selectedCert.certificateImage ? (
              <div className="mb-4 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                <img
                  src={selectedCert.certificateImage}
                  alt={selectedCert.title}
                  className="w-full h-auto object-contain max-h-[350px]"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="p-4 mb-4 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-slate-600 leading-relaxed">
                {selectedCert.isQualification
                  ? "Official professional qualification governed by the Institute of Chartered Accountants of Pakistan (ICAP)."
                  : "Completed verified training and curriculum covering the competencies listed below. A scanned certificate picture can be uploaded in the Admin portal."}
              </div>
            )}

            {selectedCert.credentialId && (
              <p className="text-xs text-slate-500 mb-3 font-mono">
                Credential ID: {selectedCert.credentialId}
              </p>
            )}

            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Demonstrated Competencies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCert.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {selectedCert.credentialUrl && (
              <a
                href={selectedCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#542C91] text-white text-xs sm:text-sm font-semibold hover:bg-[#432373] transition-colors"
              >
                <span>Verify Credential on Issuer Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
