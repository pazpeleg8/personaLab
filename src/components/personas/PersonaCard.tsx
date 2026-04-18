import type { Persona } from '../../types';
import { cn } from '../../utils/cn';

const ARCHETYPE_COLORS: Record<string, string> = {
  'power-user': 'bg-purple-100 text-purple-700 border-purple-200',
  'casual-user': 'bg-green-100 text-green-700 border-green-200',
  'skeptic': 'bg-red-100 text-red-700 border-red-200',
  'early-adopter': 'bg-blue-100 text-blue-700 border-blue-200',
  'non-technical': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'manager': 'bg-orange-100 text-orange-700 border-orange-200',
  'student': 'bg-teal-100 text-teal-700 border-teal-200',
};

const TECH_DOTS: Record<string, number> = { low: 1, medium: 2, high: 3 };

interface Props {
  persona: Persona;
  isSelected: boolean;
  onSelect: (persona: Persona) => void;
  onExpand: (persona: Persona) => void;
}

export function PersonaCard({ persona, isSelected, onSelect, onExpand }: Props) {
  return (
    <div
      onClick={() => onSelect(persona)}
      className={cn(
        'relative rounded-xl border-2 p-5 cursor-pointer transition-all',
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      )}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', ARCHETYPE_COLORS[persona.archetype] ?? 'bg-gray-100 text-gray-600 border-gray-200')}>
            {persona.archetype}
          </span>
          <span className="text-xs text-gray-400">{persona.age}</span>
        </div>
        <h3 className="font-semibold text-gray-900">{persona.name}</h3>
        <p className="text-sm text-gray-500 mt-0.5 leading-snug">{persona.occupation}</p>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-xs text-gray-400">Tech comfort</span>
          <div className="flex gap-0.5">
            {[1, 2, 3].map((n) => (
              <div key={n} className={cn('w-4 h-1.5 rounded-full', n <= TECH_DOTS[persona.techComfort] ? 'bg-blue-400' : 'bg-gray-200')} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">{persona.relevanceReason}</p>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onExpand(persona); }}
        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
      >
        View full profile →
      </button>
    </div>
  );
}
