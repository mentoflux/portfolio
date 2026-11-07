import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  addDoc,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import {
  Project,
  Certification,
  Education,
  Experience,
  Skill,
  Publication,
  WebsiteSettings,
  ContactMessage
} from '../types/portfolio';
import {
  INITIAL_PROJECTS,
  INITIAL_CERTIFICATIONS,
  INITIAL_EDUCATION,
  INITIAL_EXPERIENCE,
  INITIAL_SKILLS,
  INITIAL_PUBLICATIONS,
  INITIAL_SETTINGS
} from '../data/initialData';

// Collection names
export const COLLECTIONS = {
  PROJECTS: 'projects',
  CERTIFICATIONS: 'certifications',
  EDUCATION: 'education',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  PUBLICATIONS: 'publications',
  SETTINGS: 'settings',
  MESSAGES: 'messages'
} as const;

// Ensure database is bootstrapped with Hamza's initial portfolio data
export async function initializeDatabaseIfEmpty() {
  try {
    const settingsDoc = await getDoc(doc(db, COLLECTIONS.SETTINGS, 'general'));
    if (!settingsDoc.exists()) {
      // Bootstrap settings
      await setDoc(doc(db, COLLECTIONS.SETTINGS, 'general'), INITIAL_SETTINGS);

      // Bootstrap projects
      for (const p of INITIAL_PROJECTS) {
        await setDoc(doc(db, COLLECTIONS.PROJECTS, p.id), p);
      }

      // Bootstrap certifications
      for (const c of INITIAL_CERTIFICATIONS) {
        await setDoc(doc(db, COLLECTIONS.CERTIFICATIONS, c.id), c);
      }

      // Bootstrap education
      for (const e of INITIAL_EDUCATION) {
        await setDoc(doc(db, COLLECTIONS.EDUCATION, e.id), e);
      }

      // Bootstrap experience
      for (const exp of INITIAL_EXPERIENCE) {
        await setDoc(doc(db, COLLECTIONS.EXPERIENCE, exp.id), exp);
      }

      // Bootstrap skills
      for (const s of INITIAL_SKILLS) {
        await setDoc(doc(db, COLLECTIONS.SKILLS, s.id), s);
      }

      // Bootstrap publications
      for (const pub of INITIAL_PUBLICATIONS) {
        await setDoc(doc(db, COLLECTIONS.PUBLICATIONS, pub.id), pub);
      }
    }
  } catch (err) {
    // If permission or network issue on bootstrap, fail gracefully to initial memory data
    console.info('Database bootstrapping notes:', err);
  }
}

// Fetch all projects
export async function fetchProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, COLLECTIONS.PROJECTS), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return INITIAL_PROJECTS;
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Project));
  } catch (error) {
    console.warn('Fallback to local projects data on fetch error');
    return INITIAL_PROJECTS;
  }
}

// Fetch certifications
export async function fetchCertifications(): Promise<Certification[]> {
  try {
    const q = query(collection(db, COLLECTIONS.CERTIFICATIONS), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return INITIAL_CERTIFICATIONS;
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Certification));
  } catch (error) {
    console.warn('Fallback to local certifications data on fetch error');
    return INITIAL_CERTIFICATIONS;
  }
}

// Fetch education
export async function fetchEducation(): Promise<Education[]> {
  try {
    const q = query(collection(db, COLLECTIONS.EDUCATION), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return INITIAL_EDUCATION;
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Education));
  } catch (error) {
    console.warn('Fallback to local education data on fetch error');
    return INITIAL_EDUCATION;
  }
}

// Fetch experience
export async function fetchExperience(): Promise<Experience[]> {
  try {
    const q = query(collection(db, COLLECTIONS.EXPERIENCE), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return INITIAL_EXPERIENCE;
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Experience));
  } catch (error) {
    console.warn('Fallback to local experience data on fetch error');
    return INITIAL_EXPERIENCE;
  }
}

// Fetch skills
export async function fetchSkills(): Promise<Skill[]> {
  try {
    const q = query(collection(db, COLLECTIONS.SKILLS), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return INITIAL_SKILLS;
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Skill));
  } catch (error) {
    console.warn('Fallback to local skills data on fetch error');
    return INITIAL_SKILLS;
  }
}

// Fetch publications
export async function fetchPublications(): Promise<Publication[]> {
  try {
    const q = query(collection(db, COLLECTIONS.PUBLICATIONS), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return INITIAL_PUBLICATIONS;
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Publication));
  } catch (error) {
    console.warn('Fallback to local publications data on fetch error');
    return INITIAL_PUBLICATIONS;
  }
}

// Fetch website settings
export async function fetchSettings(): Promise<WebsiteSettings> {
  try {
    const snap = await getDoc(doc(db, COLLECTIONS.SETTINGS, 'general'));
    if (snap.exists()) {
      return snap.data() as WebsiteSettings;
    }
    return INITIAL_SETTINGS;
  } catch (error) {
    return INITIAL_SETTINGS;
  }
}

// Save website settings (Admin only)
export async function saveSettings(settings: WebsiteSettings): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.SETTINGS, 'general'), settings);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.SETTINGS}/general`);
  }
}

// Generic CRUD functions for Admin
export async function saveProject(project: Project): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.PROJECTS, project.id);
    await setDoc(docRef, { ...project, updatedAt: new Date().toISOString() });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.PROJECTS}/${project.id}`);
  }
}

export async function deleteProject(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.PROJECTS, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.PROJECTS}/${id}`);
  }
}

export async function saveCertification(cert: Certification): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.CERTIFICATIONS, cert.id), cert);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.CERTIFICATIONS}/${cert.id}`);
  }
}

export async function deleteCertification(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.CERTIFICATIONS, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.CERTIFICATIONS}/${id}`);
  }
}

export async function saveEducation(edu: Education): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.EDUCATION, edu.id), edu);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.EDUCATION}/${edu.id}`);
  }
}

export async function deleteEducation(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.EDUCATION, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.EDUCATION}/${id}`);
  }
}

export async function saveExperience(exp: Experience): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.EXPERIENCE, exp.id), exp);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.EXPERIENCE}/${exp.id}`);
  }
}

export async function deleteExperience(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.EXPERIENCE, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.EXPERIENCE}/${id}`);
  }
}

export async function saveSkill(skill: Skill): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.SKILLS, skill.id), skill);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.SKILLS}/${skill.id}`);
  }
}

export async function deleteSkill(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.SKILLS, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.SKILLS}/${id}`);
  }
}

export async function savePublication(pub: Publication): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.PUBLICATIONS, pub.id), pub);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTIONS.PUBLICATIONS}/${pub.id}`);
  }
}

export async function deletePublication(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.PUBLICATIONS, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.PUBLICATIONS}/${id}`);
  }
}

// Contact Message Submission
export async function submitContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): Promise<void> {
  try {
    await addDoc(collection(db, COLLECTIONS.MESSAGES), {
      ...message,
      createdAt: new Date().toISOString(),
      read: false
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, COLLECTIONS.MESSAGES);
  }
}

// Fetch all messages (Admin only)
export async function fetchMessages(): Promise<ContactMessage[]> {
  try {
    const q = query(collection(db, COLLECTIONS.MESSAGES), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage));
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, COLLECTIONS.MESSAGES);
    return [];
  }
}

export async function markMessageRead(id: string, read: boolean): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTIONS.MESSAGES, id), { read });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTIONS.MESSAGES}/${id}`);
  }
}

export async function deleteMessage(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.MESSAGES, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTIONS.MESSAGES}/${id}`);
  }
}

// Reorder items in batch
export async function reorderCollectionItems(
  collectionName: string,
  items: { id: string; order: number }[]
): Promise<void> {
  try {
    const batch = writeBatch(db);
    for (const item of items) {
      const ref = doc(db, collectionName, item.id);
      batch.update(ref, { order: item.order });
    }
    await batch.commit();
  } catch (error) {
    // If update fails on uncreated fields, fallback to setDoc with merge
    try {
      for (const item of items) {
        await setDoc(doc(db, collectionName, item.id), { order: item.order }, { merge: true });
      }
    } catch (fallbackError) {
      handleFirestoreError(fallbackError, OperationType.UPDATE, collectionName);
    }
  }
}

/**
 * Real-time listener for live portfolio updates across all connected mobile devices & browsers.
 */
export function subscribeToPortfolioData(callbacks: {
  onSettings?: (s: WebsiteSettings) => void;
  onProjects?: (p: Project[]) => void;
  onCertifications?: (c: Certification[]) => void;
  onEducation?: (e: Education[]) => void;
  onExperience?: (exp: Experience[]) => void;
  onSkills?: (s: Skill[]) => void;
  onPublications?: (pubs: Publication[]) => void;
}): () => void {
  const unsubs: (() => void)[] = [];

  // 1. Live Settings & Avatar Listener
  if (callbacks.onSettings) {
    try {
      const unsub = onSnapshot(
        doc(db, COLLECTIONS.SETTINGS, 'general'),
        (snap) => {
          if (snap.exists()) {
            callbacks.onSettings!(snap.data() as WebsiteSettings);
          }
        },
        (error) => {
          console.warn('Settings live listener warning:', error);
        }
      );
      unsubs.push(unsub);
    } catch (e) {
      console.warn('Could not attach settings live listener:', e);
    }
  }

  // 2. Live Projects Listener
  if (callbacks.onProjects) {
    try {
      const q = query(collection(db, COLLECTIONS.PROJECTS), orderBy('order', 'asc'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            callbacks.onProjects!(snap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
          }
        },
        (error) => {
          console.warn('Projects live listener warning:', error);
        }
      );
      unsubs.push(unsub);
    } catch (e) {
      console.warn('Could not attach projects live listener:', e);
    }
  }

  // 3. Live Certifications Listener
  if (callbacks.onCertifications) {
    try {
      const q = query(collection(db, COLLECTIONS.CERTIFICATIONS), orderBy('order', 'asc'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            callbacks.onCertifications!(snap.docs.map(d => ({ id: d.id, ...d.data() } as Certification)));
          }
        },
        (error) => {
          console.warn('Certifications live listener warning:', error);
        }
      );
      unsubs.push(unsub);
    } catch (e) {
      console.warn('Could not attach certifications live listener:', e);
    }
  }

  // 4. Live Education Listener
  if (callbacks.onEducation) {
    try {
      const q = query(collection(db, COLLECTIONS.EDUCATION), orderBy('order', 'asc'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            callbacks.onEducation!(snap.docs.map(d => ({ id: d.id, ...d.data() } as Education)));
          }
        },
        (error) => {
          console.warn('Education live listener warning:', error);
        }
      );
      unsubs.push(unsub);
    } catch (e) {
      console.warn('Could not attach education live listener:', e);
    }
  }

  // 5. Live Experience Listener
  if (callbacks.onExperience) {
    try {
      const q = query(collection(db, COLLECTIONS.EXPERIENCE), orderBy('order', 'asc'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            callbacks.onExperience!(snap.docs.map(d => ({ id: d.id, ...d.data() } as Experience)));
          }
        },
        (error) => {
          console.warn('Experience live listener warning:', error);
        }
      );
      unsubs.push(unsub);
    } catch (e) {
      console.warn('Could not attach experience live listener:', e);
    }
  }

  // 6. Live Skills Listener
  if (callbacks.onSkills) {
    try {
      const q = query(collection(db, COLLECTIONS.SKILLS), orderBy('order', 'asc'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            callbacks.onSkills!(snap.docs.map(d => ({ id: d.id, ...d.data() } as Skill)));
          }
        },
        (error) => {
          console.warn('Skills live listener warning:', error);
        }
      );
      unsubs.push(unsub);
    } catch (e) {
      console.warn('Could not attach skills live listener:', e);
    }
  }

  // 7. Live Publications Listener
  if (callbacks.onPublications) {
    try {
      const q = query(collection(db, COLLECTIONS.PUBLICATIONS), orderBy('order', 'asc'));
      const unsub = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            callbacks.onPublications!(snap.docs.map(d => ({ id: d.id, ...d.data() } as Publication)));
          }
        },
        (error) => {
          console.warn('Publications live listener warning:', error);
        }
      );
      unsubs.push(unsub);
    } catch (e) {
      console.warn('Could not attach publications live listener:', e);
    }
  }

  return () => {
    unsubs.forEach(u => {
      try { u(); } catch {}
    });
  };
}
