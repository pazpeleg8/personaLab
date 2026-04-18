export type PersonaArchetype =
  | 'power-user'
  | 'casual-user'
  | 'skeptic'
  | 'early-adopter'
  | 'non-technical'
  | 'manager'
  | 'student';

export interface PersonaTrait {
  label: string;
  value: string;
}

export interface Persona {
  id: string;
  name: string;
  age: number;
  occupation: string;
  archetype: PersonaArchetype;
  background: string;
  goals: string[];
  frustrations: string[];
  techComfort: 'low' | 'medium' | 'high';
  traits: PersonaTrait[];
  relevanceReason: string;
  suggestedQuestions: string[];
}
