import { useState } from 'react';
import type { Persona } from '../../types';
import { cn } from '../../utils/cn';
import { ArchetypeBadge } from '../shared/ArchetypeBadge';

const TECH_DOTS: Record<string, number> = { low: 1, medium: 2, high: 3 };

interface Props {
  persona: Persona;
  isSelected: boolean;
  onSelect: (persona: Persona) => void;
}

export function PersonaCard({ persona, isSelected, onSelect }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        'rounded-xl border-2 transition-all',
        isSelected
          ? 'border-indigo-500 bg-indigo-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      )}
    >
      {/* Collapsed header — always visible */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
        onClick={() => onSelect(persona)}
      >
        {/* Selection indicator */}
        <div className={cn(
          'shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
          isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
        )}>
          {isSelected && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-900">{persona.name}</span>
            <span className="text-xs text-gray-400">{persona.age}</span>
            <ArchetypeBadge archetype={persona.archetype} />
          </div>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{persona.occupation}</p>
        </div>

        {/* Expand chevron */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
          className="shrink-0 text-gray-400 hover:text-gray-600 transition-transform"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-label={expanded ? 'Collapse' : 'Expand'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
          <p className="text-xs text-gray-600 leading-relaxed">{persona.background}</p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">Goals</p>
              <ul className="space-y-0.5">
                {persona.goals.map((g, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                    <span className="text-indigo-400 shrink-0">·</span>{g}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">Frustrations</p>
              <ul className="space-y-0.5">
                {persona.frustrations.map((f, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                    <span className="text-red-400 shrink-0">·</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Tech comfort</span>
            <div className="flex gap-0.5">
              {[1, 2, 3].map((n) => (
                <div key={n} className={cn('w-4 h-1.5 rounded-full', n <= TECH_DOTS[persona.techComfort] ? 'bg-indigo-400' : 'bg-gray-200')} />
              ))}
            </div>
            <span className="text-xs text-gray-400">{persona.techComfort}</span>
          </div>

          {persona.suggestedQuestions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">Suggested questions</p>
              <ul className="space-y-1">
                {persona.suggestedQuestions.slice(0, 3).map((q, i) => (
                  <li key={i} className="text-xs text-gray-500 italic">"{q}"</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
