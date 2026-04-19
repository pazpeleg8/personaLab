import { useState } from 'react';
import { KEYS } from '../../utils/storage';
import type { Persona } from '../../types';
import { PersonaCard } from './PersonaCard';
import { CustomPersonaForm } from './CustomPersonaForm';

interface Props {
  personas: Persona[];
  selectedPersona: Persona | null;
  onSelect: (persona: Persona) => void;
  onAddCustom: (persona: Persona) => void;
}

export function PersonaGrid({ personas, selectedPersona, onSelect, onAddCustom }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const usingClaude = !!localStorage.getItem(KEYS.API_KEY);

  const handleAdd = (persona: Persona) => {
    onAddCustom(persona);
    setShowForm(false);
    setLastAdded(persona.id);
  };

  return (
    <div className="space-y-3">
      {personas.map((p) => (
        <div key={p.id}>
          <PersonaCard
            persona={p}
            isSelected={selectedPersona?.id === p.id}
            onSelect={onSelect}
          />
          {lastAdded === p.id && !usingClaude && (
            <p className="mt-1.5 px-1 text-xs text-amber-600">
              Custom personas respond generically in demo mode. Add an Anthropic API key to get in-character responses.
            </p>
          )}
        </div>
      ))}

      {showForm ? (
        <CustomPersonaForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full rounded-xl border-2 border-dashed border-gray-200 py-3 text-xs font-medium text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors"
        >
          + Create your own persona
        </button>
      )}
    </div>
  );
}
