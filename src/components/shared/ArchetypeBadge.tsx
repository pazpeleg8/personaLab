import { cn } from '../../utils/cn';

const COLORS: Record<string, string> = {
  'power-user': 'bg-purple-100 text-purple-700 border-purple-200',
  'casual-user': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'skeptic': 'bg-rose-100 text-rose-700 border-rose-200',
  'early-adopter': 'bg-sky-100 text-sky-700 border-sky-200',
  'non-technical': 'bg-amber-100 text-amber-700 border-amber-200',
  'manager': 'bg-orange-100 text-orange-700 border-orange-200',
  'student': 'bg-teal-100 text-teal-700 border-teal-200',
};

interface Props {
  archetype: string;
  className?: string;
}

export function ArchetypeBadge({ archetype, className }: Props) {
  const colors = COLORS[archetype] ?? 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', colors, className)}>
      {archetype}
    </span>
  );
}
