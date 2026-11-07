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
  fetchSettings,
  subscribeToPortfolioData
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
  
  // Instant hydration from local storage cache to eliminate any image/data flicker on refresh
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const cached = localStorage.getItem('portfolio_cache_projects');
      if (cached) return JSON.parse(cached);
    } catch {}
    return INITIAL_PROJECTS;
  });

  const [certifications, setCertifications] = useState<Certification[]>(() => {
    try {
      const cached = localStorage.getItem('portfolio_cache_certifications');
      if (cached) return JSON.parse(cached);
    } catch {}
    return INITIAL_CERTIFICATIONS;
  });

  const [education, setEducation] = useState<Education[]>(() => {
    try {
      const cached = localStorage.getItem('portfolio_cache_education');
      if (cached) return JSON.parse(cached);
    } catch {}
    return INITIAL_EDUCATION;
  });

  const [experience, setExperience] = useState<Experience[]>(() => {
    try {
      const cached = localStorage.getItem('portfolio_cache_experience');
      if (cached) return JSON.parse(cached);
    } catch {}
    return INITIAL_EXPERIENCE;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    try {
      const cached = localStorage.getItem('portfolio_cache_skills');
      if (cached) return JSON.parse(cached);
    } catch {}
    return INITIAL_SKILLS;
  });

  const [publications, setPublications] = useState<Publication[]>(() => {
    try {
      const cached = localStorage.getItem('portfolio_cache_publications');
      if (cached) return JSON.parse(cached);
    } catch {}
    return INITIAL_PUBLICATIONS;
  });

  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    try {
      const cached = localStorage.getItem('portfolio_cache_settings');
      if (cached) return JSON.parse(cached);
    } catch {}
    return INITIAL_SETTINGS;
  });

  // Track initial live database synchronization before rendering to prevent any placeholder flash
  const [initialSyncDone, setInitialSyncDone] = useState<boolean>(() => {
    // If we already have cached settings in this browser, we can display immediately
    return !!localStorage.getItem('portfolio_cache_settings');
  });
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

      if (projs && projs.length > 0) {
        setProjects(projs);
        try { localStorage.setItem('portfolio_cache_projects', JSON.stringify(projs)); } catch {}
      }
      if (certs && certs.length > 0) {
        setCertifications(certs);
        try { localStorage.setItem('portfolio_cache_certifications', JSON.stringify(certs)); } catch {}
      }
      if (edu && edu.length > 0) {
        setEducation(edu);
        try { localStorage.setItem('portfolio_cache_education', JSON.stringify(edu)); } catch {}
      }
      if (exp && exp.length > 0) {
        setExperience(exp);
        try { localStorage.setItem('portfolio_cache_experience', JSON.stringify(exp)); } catch {}
      }
      if (sks && sks.length > 0) {
        setSkills(sks);
        try { localStorage.setItem('portfolio_cache_skills', JSON.stringify(sks)); } catch {}
      }
      if (pubs && pubs.length > 0) {
        setPublications(pubs);
        try { localStorage.setItem('portfolio_cache_publications', JSON.stringify(pubs)); } catch {}
      }
      if (sets) {
        setSettings(sets);
        try { localStorage.setItem('portfolio_cache_settings', JSON.stringify(sets)); } catch {}
      }
    } catch (err) {
      console.warn('Using local portfolio cache/datasets:', err);
    } finally {
      setInitialSyncDone(true);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // 1. Initial live database load
    loadAllData().then(() => {
      if (isMounted) setInitialSyncDone(true);
    });

    // 2. Real-time Firestore sync across all devices & mobiles worldwide
    const unsubscribe = subscribeToPortfolioData({
      onSettings: (liveSettings) => {
        if (!isMounted) return;
        setSettings(liveSettings);
        try { localStorage.setItem('portfolio_cache_settings', JSON.stringify(liveSettings)); } catch {}
      },
      onProjects: (liveProjects) => {
        if (!isMounted) return;
        setProjects(liveProjects);
        try { localStorage.setItem('portfolio_cache_projects', JSON.stringify(liveProjects)); } catch {}
      },
      onCertifications: (liveCerts) => {
        if (!isMounted) return;
        setCertifications(liveCerts);
        try { localStorage.setItem('portfolio_cache_certifications', JSON.stringify(liveCerts)); } catch {}
      },
      onEducation: (liveEdu) => {
        if (!isMounted) return;
        setEducation(liveEdu);
        try { localStorage.setItem('portfolio_cache_education', JSON.stringify(liveEdu)); } catch {}
      },
      onExperience: (liveExp) => {
        if (!isMounted) return;
        setExperience(liveExp);
        try { localStorage.setItem('portfolio_cache_experience', JSON.stringify(liveExp)); } catch {}
      },
      onSkills: (liveSkills) => {
        if (!isMounted) return;
        setSkills(liveSkills);
        try { localStorage.setItem('portfolio_cache_skills', JSON.stringify(liveSkills)); } catch {}
      },
      onPublications: (livePubs) => {
        if (!isMounted) return;
        setPublications(livePubs);
        try { localStorage.setItem('portfolio_cache_publications', JSON.stringify(livePubs)); } catch {}
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
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

  // Clean, branded splash on new mobile devices while connecting to live database
  if (!initialSyncDone) {
    return (
      <div className="min-h-screen bg-[#FAF9FF] flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-14 h-14 rounded-2xl bg-[#542C91] text-white flex items-center justify-center font-bold text-xl mb-3.5 shadow-lg shadow-[#542C91]/25 animate-pulse">
          HS
        </div>
        <p className="text-xs font-semibold text-[#542C91] tracking-wider uppercase mb-2">Hamza Saif · Portfolio</p>
        <Loader2 className="w-4 h-4 text-[#542C91] animate-spin mx-auto" />
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
