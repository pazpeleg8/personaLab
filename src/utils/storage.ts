const SCHEMA_VERSION = '1';

export const KEYS = {
  VERSION: 'pil_version',
  SESSION: 'pil_session',
  CONTEXT: 'pil_context',
  PERSONAS: 'pil_personas',
  SUMMARY: 'pil_summary',
  PLAYBOOK: 'pil_playbook',
  PAGE: 'pil_page',
  EVALUATIONS: 'pil_evaluations',
} as const;

export function saveSlice(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — silently skip
  }
}

export function loadSlice<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function clearAll(): void {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}

export function checkVersion(): boolean {
  const stored = localStorage.getItem(KEYS.VERSION);
  if (stored !== SCHEMA_VERSION) {
    clearAll();
    localStorage.setItem(KEYS.VERSION, SCHEMA_VERSION);
    return false;
  }
  return true;
}
