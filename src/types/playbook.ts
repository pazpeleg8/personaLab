import type { PersonaArchetype } from './persona';

export interface PlaybookStep {
  order: number;
  question: string;
  rationale: string;
  category: 'warm-up' | 'exploration' | 'validation' | 'close';
  expectedInsight: string;
}

export interface Playbook {
  sessionId: string;
  personaArchetype: PersonaArchetype;
  title: string;
  intro: string;
  steps: PlaybookStep[];
  antiPatterns: string[];
  generatedAt: string;
}
