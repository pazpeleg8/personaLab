import type { HypothesisSignal } from '../../types';
import { SummaryCard } from './SummaryCard';
import { cn } from '../../utils/cn';

interface Props {
  signals: HypothesisSignal[];
}

const DIRECTION_STYLES = {
  for: { label: 'Supporting', dot: 'bg-green-500', quote: 'border-l-green-400', badge: 'bg-green-50 text-green-700' },
  against: { label: 'Against', dot: 'bg-red-400', quote: 'border-l-red-400', badge: 'bg-red-50 text-red-700' },
  neutral: { label: 'Neutral', dot: 'bg-gray-400', quote: 'border-l-gray-300', badge: 'bg-gray-50 text-gray-600' },
};

export function HypothesisSummary({ signals }: Props) {
  const grouped = {
    for: signals.filter((s) => s.direction === 'for'),
    against: signals.filter((s) => s.direction === 'against'),
    neutral: signals.filter((s) => s.direction === 'neutral'),
  };

  return (
    <SummaryCard title="Hypothesis signals">
      {signals.length === 0 ? (
        <p className="text-sm text-gray-400">No hypothesis signals detected in this interview.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['for', 'against', 'neutral'] as const).map((dir) => {
            const style = DIRECTION_STYLES[dir];
            const items = grouped[dir];
            return (
              <div key={dir}>
                <div className="flex items-center gap-1.5 mb-3">
                  <div className={cn('w-2 h-2 rounded-full', style.dot)} />
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{style.label}</span>
                  <span className={cn('ml-auto text-xs px-1.5 py-0.5 rounded-full font-medium', style.badge)}>
                    {items.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {items.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">None detected</p>
                  ) : (
                    items.map((s) => (
                      <div key={s.messageId} className={cn('border-l-2 pl-3', style.quote)}>
                        <p className="text-xs text-gray-700 italic mb-1">"{s.quote}"</p>
                        <p className="text-xs text-gray-500">{s.interpretation}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SummaryCard>
  );
}
