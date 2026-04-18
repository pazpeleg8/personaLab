import { useState } from 'react';
import type { Persona } from '../../types';
import { PersonaCard } from './PersonaCard';
import { PersonaDetail } from './PersonaDetail';

interface Props {
  personas: Persona[];
  selectedPersona: Persona | null;
  onSelect: (persona: Persona) => void;
}

export function PersonaGrid({ personas, selectedPersona, onSelect }: Props) {
  const [expanded, setExpanded] = useState<Persona | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {personas.map((p) => (
          <PersonaCard
            key={p.id}
            persona={p}
            isSelected={selectedPersona?.id === p.id}
            onSelect={onSelect}
            onExpand={setExpanded}
          />
        ))}
      </div>
      {expanded && <PersonaDetail persona={expanded} onClose={() => setExpanded(null)} />}
    </>
  );
}
