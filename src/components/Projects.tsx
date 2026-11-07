import React, { useState } from 'react';
import { ExternalLink, Github, Eye, X } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Filter only published projects for public display
  const publishedProjects = projects.filter((p) => p.isPublished);

  const categories = [
    'All',
    'AI Tools',
    'Web Applications',
    'Finance & Accounting',
    'Education',
    'Experiments'
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? publishedProjects
      : publishedProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-14 sm:py-20 bg-[#FAF9FF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#542C91] mb-1.5 block">
              Featured Work
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191624] tracking-tight">
              Things I've Built
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-xl">
              A collection of ideas, experiments, and digital products brought to life.
            </p>
          </div>

          {/* Interactive Category Filter Tabs with mobile horizontal scroll */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-x-auto max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#542C91] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-xs sm:text-sm">No projects published in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#542C91]/30 transition-all duration-300"
              >
                {/* Project Media Container */}
                <div
                  className="relative aspect-video w-full overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => setActiveProject(project)}
                >
                  <img
                    src={project.coverImage || '/src/assets/images/project_ecs_portal_1794068198936.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                    <span className="text-xs font-medium text-white flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-2xs">
                      <Eye className="w-3.5 h-3.5" /> Quick View
                    </span>
                  </div>

                  {project.isFeatured && (
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#542C91] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs font-medium text-[#542C91] mb-1.5">
                      <span>{project.category}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-500">Live Project</span>
                    </div>

                    <h3
                      onClick={() => setActiveProject(project)}
                      className="text-base sm:text-xl font-bold text-[#191624] mb-1.5 group-hover:text-[#542C91] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] sm:text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 pt-3.5 border-t border-slate-100">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#542C91] hover:bg-[#432373] px-3 sm:px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
                        >
                          <span>Live Project</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-[#542C91] hover:bg-slate-50 px-2.5 sm:px-3 py-2 rounded-lg border border-slate-200 transition-colors whitespace-nowrap"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}

                      <button
                        onClick={() => setActiveProject(project)}
                        className="ml-auto text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-2xs animate-fadeIn">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 border border-slate-200 text-slate-700 hover:text-black flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
              <img
                src={activeProject.coverImage}
                alt={activeProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-medium text-[#542C91] mb-1.5">
                <span>{activeProject.category}</span>
                {activeProject.isFeatured && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-amber-600">Featured Showcase</span>
                  </>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#191624] mb-2 sm:mb-3">
                {activeProject.title}
              </h3>

              <p className="text-xs sm:text-base text-slate-600 leading-relaxed mb-5 whitespace-pre-line">
                {activeProject.description}
              </p>

              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Technologies & Architecture
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium text-slate-800 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#542C91] rounded-xl hover:bg-[#432373] shadow-sm transition-colors"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                )}
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
