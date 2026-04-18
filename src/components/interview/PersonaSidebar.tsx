import type { Persona } from '../../types';
import { cn } from '../../utils/cn';

const ARCHETYPE_COLORS: Record<string, string> = {
  'power-user': 'bg-purple-100 text-purple-700',
  'casual-user': 'bg-green-100 text-green-700',
  'skeptic': 'bg-red-100 text-red-700',
  'early-adopter': 'bg-blue-100 text-blue-700',
  'non-technical': 'bg-yellow-100 text-yellow-700',
  'manager': 'bg-orange-100 text-orange-700',
  'student': 'bg-teal-100 text-teal-700',
};

const TECH_DOTS: Record<string, number> = { low: 1, medium: 2, high: 3 };

interface Props {
  persona: Persona;
}

export function PersonaSidebar({ persona }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 w-56 shrink-0">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
          {persona.name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-tight">{persona.name}</p>
          <p className="text-xs text-gray-500">{persona.age}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 leading-snug mb-3">{persona.occupation}</p>

      <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', ARCHETYPE_COLORS[persona.archetype] ?? 'bg-gray-100 text-gray-600')}>
        {persona.archetype}
      </span>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-1">Tech comfort</p>
        <div className="flex gap-0.5">
          {[1, 2, 3].map((n) => (
            <div key={n} className={cn('w-4 h-1.5 rounded-full', n <= TECH_DOTS[persona.techComfort] ? 'bg-blue-400' : 'bg-gray-200')} />
          ))}
        </div>
      </div>

      {persona.frustrations.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-1.5">Key frustrations</p>
          <ul className="space-y-1">
            {persona.frustrations.slice(0, 2).map((f) => (
              <li key={f} className="text-xs text-gray-600 leading-snug flex gap-1">
                <span className="text-red-400 shrink-0">—</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
