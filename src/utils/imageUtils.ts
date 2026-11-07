/**
 * Image resolution utility for Hamza Saif's portfolio.
 * Ensures images resolve correctly on local dev, production builds, and GitHub Pages (even in repository subpaths).
 */

export function resolveImageUrl(url?: string | null, fallback: string = ''): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallback;
  }

  const trimmed = url.trim();

  // 0. Handle unrenderable browser formats like TIFF by returning fallback
  if (trimmed.startsWith('data:image/tiff') || trimmed.startsWith('data:image/x-tiff')) {
    return fallback || './images/publication_grammar_notes.jpg';
  }

  // 1. Data URLs (base64 compressed uploads) or full HTTP(S) links
  if (
    trimmed.startsWith('data:') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // 2. If stored as legacy /src/assets/images/ in Firestore or initial state
  if (trimmed.includes('assets/images/')) {
    const filename = trimmed.split('/').pop();
    return `./images/${filename}`;
  }

  // 3. Absolute /images/ path -> convert to relative ./images/ for GitHub Pages subpath compatibility
  if (trimmed.startsWith('/images/')) {
    return `.${trimmed}`;
  }

  return trimmed;
}
