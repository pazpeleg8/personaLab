import type { HypothesisSignal } from '../../types';
import { cn } from '../../utils/cn';

interface Props {
  signals: HypothesisSignal[];
}

const DIRECTION_STYLES = {
  for: {
    label: 'Supporting',
    header: 'bg-green-50 border-green-200',
    dot: 'bg-green-500',
    count: 'bg-green-100 text-green-700',
    quote: 'border-l-green-400 bg-green-50',
    text: 'text-green-800',
  },
  against: {
    label: 'Against',
    header: 'bg-red-50 border-red-200',
    dot: 'bg-red-400',
    count: 'bg-red-100 text-red-700',
    quote: 'border-l-red-400 bg-red-50',
    text: 'text-red-800',
  },
  neutral: {
    label: 'Neutral',
    header: 'bg-gray-50 border-gray-200',
    dot: 'bg-gray-400',
    count: 'bg-gray-100 text-gray-600',
    quote: 'border-l-gray-300 bg-gray-50',
    text: 'text-gray-700',
  },
};

export function HypothesisSummary({ signals }: Props) {
  const grouped = {
    for: signals.filter((s) => s.direction === 'for'),
    against: signals.filter((s) => s.direction === 'against'),
    neutral: signals.filter((s) => s.direction === 'neutral'),
  };

  if (signals.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-sm text-gray-400">No hypothesis signals detected. Ask more open-ended questions about the problem.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {(['for', 'against', 'neutral'] as const).map((dir) => {
        const style = DIRECTION_STYLES[dir];
        const items = grouped[dir];
        return (
          <div key={dir} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className={cn('flex items-center justify-between px-4 py-2.5 border-b', style.header)}>
              <div className="flex items-center gap-2">
                <div className={cn('w-2 h-2 rounded-full', style.dot)} />
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{style.label}</span>
              </div>
              <span className={cn('text-xs px-2 py-0.5 rounded-full font-semibold', style.count)}>
                {items.length}
              </span>
            </div>
            <div className="p-4 space-y-3">
              {items.length === 0 ? (
                <p className="text-xs text-gray-400 italic">None detected</p>
              ) : (
                items.map((s) => (
                  <div key={s.messageId} className={cn('border-l-2 pl-3 py-1 rounded-r', style.quote)}>
                    <p className={cn('text-xs italic mb-1 leading-relaxed', style.text)}>"{s.quote}"</p>
                    <p className="text-xs text-gray-500">{s.interpretation}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
