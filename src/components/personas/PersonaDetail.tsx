import type { Persona } from '../../types';
import { cn } from '../../utils/cn';
import { ArchetypeBadge } from '../shared/ArchetypeBadge';

const TECH_DOTS: Record<string, number> = { low: 1, medium: 2, high: 3 };

interface Props {
  persona: Persona;
  onClose: () => void;
}

export function PersonaDetail({ persona, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ArchetypeBadge archetype={persona.archetype} />
              <span className="text-xs text-gray-400">{persona.age} years old</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{persona.name}</h2>
            <p className="text-sm text-gray-500">{persona.occupation}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 -mr-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Background</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{persona.background}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Goals</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {persona.goals.map((g) => <li key={g} className="flex gap-1.5"><span className="text-green-500 mt-0.5">+</span>{g}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Frustrations</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {persona.frustrations.map((f) => <li key={f} className="flex gap-1.5"><span className="text-red-400 mt-0.5">—</span>{f}</li>)}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tech comfort</h3>
            <div className="flex gap-1">
              {[1, 2, 3].map((n) => (
                <div key={n} className={cn('w-6 h-2 rounded-full', n <= TECH_DOTS[persona.techComfort] ? 'bg-indigo-400' : 'bg-gray-200')} />
              ))}
              <span className="ml-2 text-xs text-gray-500 capitalize">{persona.techComfort}</span>
            </div>
          </div>

          {persona.traits.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key traits</h3>
              <div className="space-y-1">
                {persona.traits.map((t) => (
                  <div key={t.label} className="flex gap-2 text-sm">
                    <span className="text-gray-400 shrink-0">{t.label}:</span>
                    <span className="text-gray-700">{t.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
