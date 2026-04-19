import { cn } from '../../utils/cn';

const STEPS = [
  { label: 'Context', key: 'setup' },
  { label: 'Persona', key: 'persona-select' },
  { label: 'Interview', key: 'interview' },
  { label: 'Summary', key: 'summary' },
] as const;

type Page = (typeof STEPS)[number]['key'];

const PAGE_INDEX: Record<Page, number> = {
  setup: 0,
  'persona-select': 1,
  interview: 2,
  summary: 3,
};

interface Props {
  currentPage: Page;
}

export function ProgressBar({ currentPage }: Props) {
  const currentIndex = PAGE_INDEX[currentPage];

  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
                  isCompleted && 'bg-gray-900 text-white',
                  isCurrent && 'bg-indigo-600 text-white ring-4 ring-indigo-100',
                  !isCompleted && !isCurrent && 'bg-gray-100 text-gray-400'
                )}
              >
                {isCompleted ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  'text-xs whitespace-nowrap',
                  isCurrent ? 'text-indigo-600 font-medium' : isCompleted ? 'text-gray-500' : 'text-gray-400'
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-px w-16 mx-2 mb-4 transition-colors',
                  i < currentIndex ? 'bg-gray-900' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
