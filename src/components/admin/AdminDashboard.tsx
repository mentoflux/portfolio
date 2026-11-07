import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  Award,
  GraduationCap,
  Briefcase,
  CheckSquare,
  BookOpen,
  User,
  Settings,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Eye,
  CheckCircle,
  AlertCircle,
  Upload,
  ExternalLink,
  ChevronRight,
  X,
  Menu,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  Project,
  Certification,
  Education,
  Experience,
  Skill,
  Publication,
  WebsiteSettings,
  ContactMessage
} from '../../types/portfolio';
import {
  saveProject,
  deleteProject,
  saveCertification,
  deleteCertification,
  saveEducation,
  deleteEducation,
  saveExperience,
  deleteExperience,
  saveSkill,
  deleteSkill,
  savePublication,
  deletePublication,
  saveSettings,
  fetchMessages,
  markMessageRead,
  deleteMessage
} from '../../services/portfolioService';

interface AdminDashboardProps {
  onClose: () => void;
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  publications: Publication[];
  settings: WebsiteSettings;
  onRefreshData: () => Promise<void>;
}

type TabType =
  | 'overview'
  | 'projects'
  | 'certifications'
  | 'education'
  | 'experience'
  | 'skills'
  | 'publications'
  | 'about'
  | 'messages'
  | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose,
  projects,
  certifications,
  education,
  experience,
  skills,
  publications,
  settings,
  onRefreshData,
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Messages list state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Modal edit states
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);
  const [editingEdu, setEditingEdu] = useState<Partial<Education> | null>(null);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [editingPub, setEditingPub] = useState<Partial<Publication> | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<WebsiteSettings>(settings);

  // Confirm delete dialog state
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    title: string;
    onConfirm: () => Promise<void>;
  }>({ isOpen: false, title: '', onConfirm: async () => {} });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Load messages when messages tab or overview is active
  useEffect(() => {
    if (activeTab === 'messages' || activeTab === 'overview') {
      loadMessages();
    }
  }, [activeTab]);

  const loadMessages = async () => {
    try {
      setLoadingMessages(true);
      const msgs = await fetchMessages();
      setMessages(msgs);
    } catch (err) {
      console.warn('Could not load messages or no permissions yet:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Helper for image upload to base64
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 800000) {
      showToast('Image is large. Please select an image under 800KB for faster loading.', 'error');
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onComplete(event.target.result as string);
        showToast('Image uploaded successfully');
      }
    };
    reader.readAsDataURL(file);
  };

  // --- Projects Handlers ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject.description) {
      showToast('Please fill out required project fields', 'error');
      return;
    }

    try {
      setLoadingAction(true);
      const projectToSave: Project = {
        id: editingProject.id || `proj-${Date.now()}`,
        title: editingProject.title,
        description: editingProject.description,
        coverImage: editingProject.coverImage || '/src/assets/images/project_ecs_portal_1794068198936.jpg',
        category: (editingProject.category as any) || 'Web Applications',
        technologies: Array.isArray(editingProject.technologies)
          ? editingProject.technologies
          : typeof editingProject.technologies === 'string'
          ? (editingProject.technologies as string).split(',').map((t) => t.trim())
          : ['React', 'TypeScript'],
        liveUrl: editingProject.liveUrl || '',
        githubUrl: editingProject.githubUrl || '',
        isFeatured: editingProject.isFeatured ?? false,
        isPublished: editingProject.isPublished ?? true,
        order: editingProject.order ?? projects.length + 1,
      };

      await saveProject(projectToSave);
      await onRefreshData();
      setEditingProject(null);
      showToast('Project saved successfully');
    } catch (err: any) {
      showToast(err.message || 'Error saving project', 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  // --- Certifications Handlers ---
  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.title || !editingCert.issuer) {
      showToast('Please provide certificate title and issuer', 'error');
      return;
    }

    try {
      setLoadingAction(true);
      const certToSave: Certification = {
        id: editingCert.id || `cert-${Date.now()}`,
        title: editingCert.title,
        issuer: editingCert.issuer,
        issueDate: editingCert.issueDate || '2024',
        skills: Array.isArray(editingCert.skills)
          ? editingCert.skills
          : typeof editingCert.skills === 'string'
          ? (editingCert.skills as string).split(',').map((s) => s.trim())
          : ['General'],
        credentialId: editingCert.credentialId || '',
        certificateImage: editingCert.certificateImage || '',
        credentialUrl: editingCert.credentialUrl || '',
        isQualification: editingCert.isQualification ?? false,
        order: editingCert.order ?? certifications.length + 1,
      };

      await saveCertification(certToSave);
      await onRefreshData();
      setEditingCert(null);
      showToast('Certification saved successfully');
    } catch (err: any) {
      showToast(err.message || 'Error saving certification', 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  // --- Education Handlers ---
  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu?.degree || !editingEdu.institution) return;

    try {
      setLoadingAction(true);
      const eduToSave: Education = {
        id: editingEdu.id || `edu-${Date.now()}`,
        degree: editingEdu.degree,
        institution: editingEdu.institution,
        period: editingEdu.period || '2025',
        description: editingEdu.description || '',
        order: editingEdu.order ?? education.length + 1,
      };

      await saveEducation(eduToSave);
      await onRefreshData();
      setEditingEdu(null);
      showToast('Education milestone saved');
    } catch (err: any) {
      showToast(err.message || 'Error saving education', 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  // --- Experience Handlers ---
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.role || !editingExp.organization) return;

    try {
      setLoadingAction(true);
      const expToSave: Experience = {
        id: editingExp.id || `exp-${Date.now()}`,
        role: editingExp.role,
        organization: editingExp.organization,
        period: editingExp.period || '2024',
        description: editingExp.description || '',
        order: editingExp.order ?? experience.length + 1,
      };

      await saveExperience(expToSave);
      await onRefreshData();
      setEditingExp(null);
      showToast('Experience entry saved');
    } catch (err: any) {
      showToast(err.message || 'Error saving experience', 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  // --- Skills Handlers ---
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name) return;

    try {
      setLoadingAction(true);
      const skillToSave: Skill = {
        id: editingSkill.id || `skill-${Date.now()}`,
        name: editingSkill.name,
        category: (editingSkill.category as any) || 'Development',
        order: editingSkill.order ?? skills.length + 1,
      };

      await saveSkill(skillToSave);
      await onRefreshData();
      setEditingSkill(null);
      showToast('Skill saved');
    } catch (err: any) {
      showToast(err.message || 'Error saving skill', 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  // --- Publications Handlers ---
  const handleSavePub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPub?.title || !editingPub.description) return;

    try {
      setLoadingAction(true);
      const pubToSave: Publication = {
        id: editingPub.id || `pub-${Date.now()}`,
        title: editingPub.title,
        description: editingPub.description,
        coverImage: editingPub.coverImage || '',
        externalUrl: editingPub.externalUrl || '',
        order: editingPub.order ?? publications.length + 1,
      };

      await savePublication(pubToSave);
      await onRefreshData();
      setEditingPub(null);
      showToast('Publication saved');
    } catch (err: any) {
      showToast(err.message || 'Error saving publication', 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  // --- Settings & About Handlers ---
  const handleSaveGeneralSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingAction(true);
      await saveSettings(settingsForm);
      await onRefreshData();
      showToast('Website settings and hero content updated');
    } catch (err: any) {
      showToast(err.message || 'Error updating settings', 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      {/* Top Bar for Admin */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-1.5 text-slate-700 hover:text-[#542C91] rounded-lg hover:bg-slate-100"
            aria-label="Toggle navigation drawer"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#542C91] text-white flex items-center justify-center font-bold text-xs shrink-0">
            HS
          </span>
          <div>
            <h1 className="text-xs sm:text-base font-bold text-slate-900 leading-tight">
              Hamza Saif Portfolio Admin
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500">
              Authenticated as <span className="font-mono text-purple-700 font-semibold">Administrator</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Portfolio</span>
            <span className="sm:hidden">Close</span>
          </button>

          <button
            onClick={async () => {
              await logout();
              onClose();
            }}
            className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace with Sidebar */}
      <div className="flex flex-1 overflow-hidden bg-slate-50 relative">
        
        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            mobileSidebarOpen ? 'translate-x-0 z-30' : '-translate-x-full md:translate-x-0'
          } fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between shrink-0 overflow-y-auto transition-transform duration-200 ease-in-out`}
        >
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
              Dashboard Navigation
            </div>

            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'projects', label: 'Manage Projects', icon: FolderGit2, badge: projects.length },
              { id: 'certifications', label: 'Certifications', icon: Award, badge: certifications.length },
              { id: 'education', label: 'Education', icon: GraduationCap, badge: education.length },
              { id: 'experience', label: 'Experience', icon: Briefcase, badge: experience.length },
              { id: 'skills', label: 'Skills', icon: CheckSquare, badge: skills.length },
              { id: 'publications', label: 'Publications', icon: BookOpen, badge: publications.length },
              { id: 'about', label: 'Hero & About Me', icon: User },
              { id: 'messages', label: 'Inquiries (Messages)', icon: Mail, badge: messages.filter(m => !m.read).length || undefined },
              { id: 'settings', label: 'Website Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#542C91] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Realtime Firestore Sync Active
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* Toast Notification */}
          {toast && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium shadow-sm transition-all animate-fadeIn ${
                toast.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Welcome to Your Portfolio Control Center
                </h2>
                <p className="text-sm text-slate-600">
                  Manage projects, update credentials, edit hero/about content, and monitor inquiries in real-time.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Published Projects', count: projects.filter(p => p.isPublished).length, total: projects.length, icon: FolderGit2, tab: 'projects' },
                  { label: 'Certifications', count: certifications.length, icon: Award, tab: 'certifications' },
                  { label: 'Education Milestones', count: education.length, icon: GraduationCap, tab: 'education' },
                  { label: 'Experience Entries', count: experience.length, icon: Briefcase, tab: 'experience' },
                  { label: 'Active Skills', count: skills.length, icon: CheckSquare, tab: 'skills' },
                  { label: 'Publications', count: publications.length, icon: BookOpen, tab: 'publications' },
                  { label: 'New Inquiries', count: messages.filter(m => !m.read).length, icon: Mail, tab: 'messages' },
                ].map((st, idx) => {
                  const Icon = st.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveTab(st.tab as TabType)}
                      className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#542C91]/40 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500">{st.label}</span>
                        <Icon className="w-4 h-4 text-[#542C91] group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="text-2xl font-bold text-slate-900 font-mono">
                        {st.count}
                        {st.total !== undefined && (
                          <span className="text-xs font-normal text-slate-400 font-sans ml-1">
                            / {st.total} total
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Inquiries Preview */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900">
                    Recent Contact Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-xs font-semibold text-[#542C91] hover:underline"
                  >
                    View All Inquiries →
                  </button>
                </div>

                {messages.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">No messages received yet.</p>
                ) : (
                  <div className="space-y-3">
                    {messages.slice(0, 3).map((msg) => (
                      <div
                        key={msg.id}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start justify-between gap-4 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-900">{msg.name}</span>
                            <span className="text-slate-400 font-mono">({msg.email})</span>
                            {!msg.read && (
                              <span className="bg-[#542C91] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                                New
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-slate-800 mb-0.5">{msg.subject}</p>
                          <p className="text-slate-500 line-clamp-1">{msg.message}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Manage Projects</h2>
                  <p className="text-xs text-slate-500">Add, edit, reorder, or publish portfolio projects.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingProject({
                      title: '',
                      description: '',
                      category: 'Web Applications',
                      technologies: ['React', 'TypeScript'],
                      liveUrl: '',
                      githubUrl: '',
                      coverImage: '/src/assets/images/project_ecs_portal_1794068198936.jpg',
                      isPublished: true,
                      isFeatured: false,
                      order: projects.length + 1,
                    })
                  }
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#542C91] rounded-xl hover:bg-[#432373] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>
              </div>

              {/* Projects Table / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <img
                          src={proj.coverImage}
                          alt={proj.title}
                          className="w-20 h-14 object-cover rounded-lg bg-slate-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-bold text-[#542C91] bg-purple-50 px-2 py-0.5 rounded">
                              {proj.category}
                            </span>
                            {proj.isFeatured && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                                Featured
                              </span>
                            )}
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                proj.isPublished
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {proj.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm truncate">{proj.title}</h3>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">{proj.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                      <span className="text-slate-400 font-mono">Order: #{proj.order}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="p-1.5 text-slate-600 hover:text-[#542C91] hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteDialog({
                              isOpen: true,
                              title: `Delete "${proj.title}"?`,
                              onConfirm: async () => {
                                await deleteProject(proj.id);
                                await onRefreshData();
                                showToast('Project deleted');
                              },
                            });
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Certifications & Learning</h2>
                  <p className="text-xs text-slate-500">Manage credentials from ICAP, Great Learning, and Open Weaver.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingCert({
                      title: '',
                      issuer: '',
                      issueDate: '2024',
                      skills: ['Skill 1'],
                      isQualification: false,
                      order: certifications.length + 1,
                    })
                  }
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#542C91] rounded-xl hover:bg-[#432373] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Credential</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-[#542C91]">{c.issuer}</span>
                        <span className="text-[11px] font-mono text-slate-400">{c.issueDate}</span>
                      </div>
                      {c.certificateImage && (
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 mb-2.5 bg-slate-100">
                          <img
                            src={c.certificateImage}
                            alt={c.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <h3 className="font-bold text-slate-900 text-sm mb-2">{c.title}</h3>
                      {c.isQualification && (
                        <span className="inline-block mb-3 text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                          Professional Qualification
                        </span>
                      )}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {c.skills.map((s, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                      <span className="text-slate-400 font-mono">Order: #{c.order}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingCert(c)}
                          className="p-1.5 text-slate-600 hover:text-[#542C91] hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteDialog({
                              isOpen: true,
                              title: `Delete "${c.title}"?`,
                              onConfirm: async () => {
                                await deleteCertification(c.id);
                                await onRefreshData();
                                showToast('Certification removed');
                              },
                            });
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MANAGE EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Education Timeline</h2>
                  <p className="text-xs text-slate-500">Manage CA milestones, intermediate, and secondary education.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingEdu({
                      degree: '',
                      institution: '',
                      period: '',
                      description: '',
                      order: education.length + 1,
                    })
                  }
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#542C91] rounded-xl hover:bg-[#432373] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="space-y-3">
                {education.map((e) => (
                  <div
                    key={e.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#542C91]">{e.period}</span>
                      <h3 className="font-bold text-slate-900 text-sm mt-0.5">{e.degree}</h3>
                      <p className="text-xs font-medium text-slate-700">{e.institution}</p>
                      {e.description && <p className="text-xs text-slate-500 mt-1">{e.description}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingEdu(e)}
                        className="p-2 text-slate-600 hover:text-[#542C91] hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteDialog({
                            isOpen: true,
                            title: `Delete "${e.degree}"?`,
                            onConfirm: async () => {
                              await deleteEducation(e.id);
                              await onRefreshData();
                              showToast('Education removed');
                            },
                          });
                        }}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MANAGE EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Experience & Leadership</h2>
                  <p className="text-xs text-slate-500">Manage community initiatives, ambassadorships, and leadership roles.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingExp({
                      role: '',
                      organization: '',
                      period: '',
                      description: '',
                      order: experience.length + 1,
                    })
                  }
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#542C91] rounded-xl hover:bg-[#432373] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-3">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#542C91]">{exp.period}</span>
                      <h3 className="font-bold text-slate-900 text-sm mt-0.5">{exp.role}</h3>
                      <p className="text-xs font-medium text-slate-700">{exp.organization}</p>
                      <p className="text-xs text-slate-500 mt-1">{exp.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingExp(exp)}
                        className="p-2 text-slate-600 hover:text-[#542C91] hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteDialog({
                            isOpen: true,
                            title: `Delete "${exp.role}"?`,
                            onConfirm: async () => {
                              await deleteExperience(exp.id);
                              await onRefreshData();
                              showToast('Experience removed');
                            },
                          });
                        }}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MANAGE SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Manage Skills</h2>
                  <p className="text-xs text-slate-500">Categorize your technical, AI, marketing, and financial competencies.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingSkill({
                      name: '',
                      category: 'Development',
                      order: skills.length + 1,
                    })
                  }
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#542C91] rounded-xl hover:bg-[#432373] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {skills.map((s) => (
                    <div
                      key={s.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{s.name}</p>
                        <p className="text-[10px] text-[#542C91]">{s.category}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setEditingSkill(s)}
                          className="p-1 text-slate-500 hover:text-[#542C91]"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            await deleteSkill(s.id);
                            await onRefreshData();
                            showToast('Skill deleted');
                          }}
                          className="p-1 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: MANAGE PUBLICATIONS */}
          {activeTab === 'publications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Publications & Resources</h2>
                  <p className="text-xs text-slate-500">Manage authored guides, practice books, and reference notes.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingPub({
                      title: '',
                      description: '',
                      coverImage: '',
                      externalUrl: '',
                      order: publications.length + 1,
                    })
                  }
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#542C91] rounded-xl hover:bg-[#432373] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Publication</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-start justify-between gap-4"
                  >
                    <div className="flex gap-4">
                      {pub.coverImage && (
                        <img
                          src={pub.coverImage}
                          alt={pub.title}
                          className="w-14 h-20 object-cover rounded-md bg-slate-100 shrink-0"
                        />
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm mb-1">{pub.title}</h3>
                        <p className="text-xs text-slate-600 line-clamp-3">{pub.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingPub(pub)}
                        className="p-1.5 text-slate-600 hover:text-[#542C91] hover:bg-purple-50 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteDialog({
                            isOpen: true,
                            title: `Delete "${pub.title}"?`,
                            onConfirm: async () => {
                              await deletePublication(pub.id);
                              await onRefreshData();
                              showToast('Publication deleted');
                            },
                          });
                        }}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: HERO & ABOUT CONTENT */}
          {activeTab === 'about' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Hero & About Section Content</h2>
                <p className="text-xs text-slate-500">Edit your main headlines, intro copy, and biography.</p>
              </div>

              <form onSubmit={handleSaveGeneralSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.heroHeadline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#542C91]/30 focus:border-[#542C91]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hero Subheadline / Role Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.heroSubheadline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubheadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#542C91]/30 focus:border-[#542C91]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hero Supporting Description
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.heroDescription}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#542C91]/30 focus:border-[#542C91]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    About Me Detailed Story
                  </label>
                  <textarea
                    rows={5}
                    value={settingsForm.aboutText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, aboutText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#542C91]/30 focus:border-[#542C91]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Profile Avatar (Image Upload or URL)
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={settingsForm.avatarUrl}
                      alt="Avatar Preview"
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={settingsForm.avatarUrl}
                        onChange={(e) => setSettingsForm({ ...settingsForm, avatarUrl: e.target.value })}
                        placeholder="Image URL or upload"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload New Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (url) => setSettingsForm({ ...settingsForm, avatarUrl: url }))
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loadingAction}
                  className="px-6 py-2.5 bg-[#542C91] hover:bg-[#432373] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  Save Hero & About Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 9: INQUIRIES & MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Contact Inquiries Inbox</h2>
                  <p className="text-xs text-slate-500">Messages sent through your portfolio contact form.</p>
                </div>
                <button
                  onClick={loadMessages}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Refresh Inbox
                </button>
              </div>

              {loadingMessages ? (
                <div className="p-12 text-center text-xs text-slate-500">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
                  No inquiries received yet. Visitors can message you from the contact section.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-6 rounded-2xl bg-white border shadow-xs transition-colors ${
                        msg.read ? 'border-slate-200' : 'border-purple-300 ring-1 ring-purple-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-sm">{msg.name}</h3>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-xs text-[#542C91] font-mono hover:underline"
                            >
                              {msg.email}
                            </a>
                            {!msg.read && (
                              <span className="bg-[#542C91] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                                Unread
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-slate-700 mt-1">{msg.subject}</p>
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {msg.message}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-2">
                        <button
                          onClick={async () => {
                            await markMessageRead(msg.id, !msg.read);
                            loadMessages();
                          }}
                          className="text-slate-600 hover:text-[#542C91] font-semibold"
                        >
                          {msg.read ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                        <button
                          onClick={async () => {
                            await deleteMessage(msg.id);
                            loadMessages();
                            showToast('Message deleted');
                          }}
                          className="text-rose-600 hover:text-rose-800 font-semibold"
                        >
                          Delete Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 10: WEBSITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Website Global Settings</h2>
                <p className="text-xs text-slate-500">Configure contact links, availability status, and social profiles.</p>
              </div>

              <form onSubmit={handleSaveGeneralSettings} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={settingsForm.linkedin}
                    onChange={(e) => setSettingsForm({ ...settingsForm, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Navbar Availability Indicator Text
                  </label>
                  <input
                    type="text"
                    value={settingsForm.availabilityText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, availabilityText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingAction}
                  className="px-6 py-2.5 bg-[#542C91] hover:bg-[#432373] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save Settings
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: EDIT / ADD PROJECT */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {editingProject.id ? 'Edit Project' : 'Add New Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  value={editingProject.category || 'Web Applications'}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                >
                  <option value="AI Tools">AI Tools</option>
                  <option value="Web Applications">Web Applications</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                  <option value="Education">Education</option>
                  <option value="Experiments">Experiments</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={
                    Array.isArray(editingProject.technologies)
                      ? editingProject.technologies.join(', ')
                      : editingProject.technologies || ''
                  }
                  onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Live URL</label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cover Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingProject.coverImage || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    placeholder="Image URL or upload"
                  />
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold cursor-pointer shrink-0">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (url) => setEditingProject({ ...editingProject, coverImage: url }))
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isPublished ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, isPublished: e.target.checked })}
                    className="w-4 h-4 text-[#542C91] rounded"
                  />
                  <span>Published (Visible publicly)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isFeatured ?? false}
                    onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-[#542C91] rounded"
                  />
                  <span>Featured Project</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loadingAction}
                className="w-full py-2.5 bg-[#542C91] hover:bg-[#432373] text-white text-xs font-semibold rounded-xl mt-4"
              >
                Save Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD CERTIFICATION */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <button
              onClick={() => setEditingCert(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {editingCert.id ? 'Edit Credential' : 'Add Credential'}
            </h3>

            <form onSubmit={handleSaveCert} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Certification Title *</label>
                <input
                  type="text"
                  required
                  value={editingCert.title || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Issuing Organization *</label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  placeholder="e.g. Great Learning or ICAP"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Date</label>
                <input
                  type="text"
                  value={editingCert.issueDate || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                  placeholder="e.g. 2023 or November 2025"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={
                    Array.isArray(editingCert.skills)
                      ? editingCert.skills.join(', ')
                      : editingCert.skills || ''
                  }
                  onChange={(e) => setEditingCert({ ...editingCert, skills: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Certificate Picture / Document Image
                </label>
                {editingCert.certificateImage && (
                  <div className="relative mb-2 w-full h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img
                      src={editingCert.certificateImage}
                      alt="Certificate Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setEditingCert({ ...editingCert, certificateImage: '' })}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white px-2 py-1 rounded-md text-[10px] flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingCert.certificateImage || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, certificateImage: e.target.value })}
                    placeholder="Image URL or upload from device"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                  <label className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-[#542C91] rounded-xl text-xs font-semibold cursor-pointer shrink-0 border border-purple-200 flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Picture</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (url) => setEditingCert({ ...editingCert, certificateImage: url }))
                      }
                    />
                  </label>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editingCert.isQualification ?? false}
                  onChange={(e) => setEditingCert({ ...editingCert, isQualification: e.target.checked })}
                  className="w-4 h-4 text-[#542C91] rounded"
                />
                <span>Official Professional Qualification (e.g. ICAP)</span>
              </label>

              <button
                type="submit"
                disabled={loadingAction}
                className="w-full py-2.5 bg-[#542C91] hover:bg-[#432373] text-white text-xs font-semibold rounded-xl mt-3"
              >
                Save Credential
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD EDUCATION */}
      {editingEdu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <button
              onClick={() => setEditingEdu(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Education Entry</h3>

            <form onSubmit={handleSaveEdu} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Degree / Level *</label>
                <input
                  type="text"
                  required
                  value={editingEdu.degree || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  value={editingEdu.institution || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Time Period</label>
                <input
                  type="text"
                  value={editingEdu.period || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, period: e.target.value })}
                  placeholder="e.g. 2023 – 2025"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Notes</label>
                <textarea
                  rows={3}
                  value={editingEdu.description || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loadingAction}
                className="w-full py-2.5 bg-[#542C91] hover:bg-[#432373] text-white text-xs font-semibold rounded-xl mt-3"
              >
                Save Education
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD EXPERIENCE */}
      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <button
              onClick={() => setEditingExp(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Experience Entry</h3>

            <form onSubmit={handleSaveExp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={editingExp.role || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Organization *</label>
                <input
                  type="text"
                  required
                  value={editingExp.organization || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Time Period</label>
                <input
                  type="text"
                  value={editingExp.period || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingExp.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loadingAction}
                className="w-full py-2.5 bg-[#542C91] hover:bg-[#432373] text-white text-xs font-semibold rounded-xl mt-3"
              >
                Save Experience
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD SKILL */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl">
            <button
              onClick={() => setEditingSkill(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Skill</h3>

            <form onSubmit={handleSaveSkill} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  value={editingSkill.category || 'Development'}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                >
                  <option value="Development">Web Development</option>
                  <option value="AI & Tools">AI & Tools</option>
                  <option value="Marketing & SEO">Marketing & SEO</option>
                  <option value="Finance & Business">Finance & Business</option>
                  <option value="Leadership">Leadership</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loadingAction}
                className="w-full py-2.5 bg-[#542C91] hover:bg-[#432373] text-white text-xs font-semibold rounded-xl mt-3"
              >
                Save Skill
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD PUBLICATION */}
      {editingPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <button
              onClick={() => setEditingPub(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Publication</h3>

            <form onSubmit={handleSavePub} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingPub.title || ''}
                  onChange={(e) => setEditingPub({ ...editingPub, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingPub.description || ''}
                  onChange={(e) => setEditingPub({ ...editingPub, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cover Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingPub.coverImage || ''}
                    onChange={(e) => setEditingPub({ ...editingPub, coverImage: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    placeholder="URL or Upload"
                  />
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (url) => setEditingPub({ ...editingPub, coverImage: url }))
                      }
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">External Resource Link</label>
                <input
                  type="url"
                  value={editingPub.externalUrl || ''}
                  onChange={(e) => setEditingPub({ ...editingPub, externalUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loadingAction}
                className="w-full py-2.5 bg-[#542C91] hover:bg-[#432373] text-white text-xs font-semibold rounded-xl mt-3"
              >
                Save Publication
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRM DELETION */}
      {deleteDialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Confirm Removal</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to delete {deleteDialog.title}? This change will immediately remove it from your live portfolio.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteDialog({ isOpen: false, title: '', onConfirm: async () => {} })}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteDialog.onConfirm();
                  setDeleteDialog({ isOpen: false, title: '', onConfirm: async () => {} });
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
