import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Journey } from './components/Journey';
import { SkillsSection } from './components/SkillsSection';
import { PublicationsSection } from './components/PublicationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import {
  Project,
  Certification,
  Education,
  Experience,
  Skill,
  Publication,
  WebsiteSettings
} from './types/portfolio';
import {
  initializeDatabaseIfEmpty,
  fetchProjects,
  fetchCertifications,
  fetchEducation,
  fetchExperience,
  fetchSkills,
  fetchPublications,
  fetchSettings
} from './services/portfolioService';
import {
  INITIAL_PROJECTS,
  INITIAL_CERTIFICATIONS,
  INITIAL_EDUCATION,
  INITIAL_EXPERIENCE,
  INITIAL_SKILLS,
  INITIAL_PUBLICATIONS,
  INITIAL_SETTINGS
} from './data/initialData';
import { Loader2 } from 'lucide-react';

function PortfolioMain() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [certifications, setCertifications] = useState<Certification[]>(INITIAL_CERTIFICATIONS);
  const [education, setEducation] = useState<Education[]>(INITIAL_EDUCATION);
  const [experience, setExperience] = useState<Experience[]>(INITIAL_EXPERIENCE);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [publications, setPublications] = useState<Publication[]>(INITIAL_PUBLICATIONS);
  const [settings, setSettings] = useState<WebsiteSettings>(INITIAL_SETTINGS);

  const [loadingData, setLoadingData] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const loadAllData = async () => {
    try {
      await initializeDatabaseIfEmpty();
      const [projs, certs, edu, exp, sks, pubs, sets] = await Promise.all([
        fetchProjects(),
        fetchCertifications(),
        fetchEducation(),
        fetchExperience(),
        fetchSkills(),
        fetchPublications(),
        fetchSettings()
      ]);

      if (projs && projs.length > 0) setProjects(projs);
      if (certs && certs.length > 0) setCertifications(certs);
      if (edu && edu.length > 0) setEducation(edu);
      if (exp && exp.length > 0) setExperience(exp);
      if (sks && sks.length > 0) setSkills(sks);
      if (pubs && pubs.length > 0) setPublications(pubs);
      if (sets) setSettings(sets);
    } catch (err) {
      console.warn('Using default initial portfolio datasets:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setDashboardOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  // Automatically open dashboard if user logs in while modal was up
  useEffect(() => {
    if (isAdmin && loginModalOpen) {
      setLoginModalOpen(false);
      setDashboardOpen(true);
    }
  }, [isAdmin, loginModalOpen]);

  if (loadingData && authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9FF] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#542C91] text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md animate-pulse">
          HS
        </div>
        <p className="text-sm font-semibold text-slate-700 mb-2">Loading Hamza Saif's Portfolio...</p>
        <Loader2 className="w-5 h-5 text-[#542C91] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9FF] text-[#191624] flex flex-col selection:bg-[#542C91] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenAdmin={handleOpenAdmin}
        availabilityText={settings.availabilityText}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero settings={settings} />
        <About settings={settings} />
        <Projects projects={projects} />
        <Certifications certifications={certifications} />
        <Journey education={education} experience={experience} />
        <SkillsSection skills={skills} />
        <PublicationsSection publications={publications} />
        <ContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Admin Login Dialog */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      {/* Admin Management Dashboard */}
      {isAdmin && dashboardOpen && (
        <AdminDashboard
          onClose={() => setDashboardOpen(false)}
          projects={projects}
          certifications={certifications}
          education={education}
          experience={experience}
          skills={skills}
          publications={publications}
          settings={settings}
          onRefreshData={loadAllData}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioMain />
    </AuthProvider>
  );
}
