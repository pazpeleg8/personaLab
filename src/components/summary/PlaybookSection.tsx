import type { Playbook } from '../../types';
import { SummaryCard } from './SummaryCard';
import { cn } from '../../utils/cn';

const CATEGORY_STYLES = {
  'warm-up': 'bg-blue-50 text-blue-700 border-blue-200',
  'exploration': 'bg-purple-50 text-purple-700 border-purple-200',
  'validation': 'bg-amber-50 text-amber-700 border-amber-200',
  'close': 'bg-gray-50 text-gray-600 border-gray-200',
};

interface Props {
  playbook: Playbook;
}

export function PlaybookSection({ playbook }: Props) {
  return (
    <SummaryCard title="Interview playbook">
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">{playbook.intro}</p>

      <div className="space-y-3 mb-6">
        {playbook.steps.map((step) => (
          <div key={step.order} className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0 mt-0.5">
              {step.order}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm text-gray-900 font-medium">{step.question}</p>
                <span className={cn('text-xs px-1.5 py-0.5 rounded border shrink-0', CATEGORY_STYLES[step.category])}>
                  {step.category}
                </span>
              </div>
              <p className="text-xs text-gray-500">{step.rationale}</p>
              <p className="text-xs text-blue-600 mt-0.5">Insight: {step.expectedInsight}</p>
            </div>
          </div>
        ))}
      </div>

      {playbook.antiPatterns.length > 0 && (
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">Questions to avoid</p>
          <ul className="space-y-1">
            {playbook.antiPatterns.map((ap) => (
              <li key={ap} className="text-xs text-red-700 flex gap-1.5">
                <span className="shrink-0">✕</span>
                {ap}
              </li>
            ))}
          </ul>
        </div>
      )}
    </SummaryCard>
  );
}
