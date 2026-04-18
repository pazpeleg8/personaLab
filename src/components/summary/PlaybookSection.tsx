import type { Playbook } from '../../types';
import { cn } from '../../utils/cn';
import { playbookToMarkdown, downloadMarkdown } from '../../utils/exportPlaybook';

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
  const handleExport = () => {
    const md = playbookToMarkdown(playbook);
    const slug = playbook.personaArchetype.replace(/\s+/g, '-');
    downloadMarkdown(`playbook-${slug}.md`, md);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
        <p className="text-sm text-gray-600 leading-relaxed">{playbook.intro}</p>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition shrink-0 ml-4"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export .md
        </button>
      </div>

      <div className="p-5 space-y-3">
        {playbook.steps.map((step) => (
          <div key={step.order} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0 mt-0.5">
              {step.order}
            </div>
            <div className="flex-1">
              <div className="flex items-start gap-2 mb-1">
                <p className="text-sm text-gray-900 font-medium flex-1">{step.question}</p>
                <span className={cn('text-xs px-1.5 py-0.5 rounded border shrink-0 mt-0.5', CATEGORY_STYLES[step.category])}>
                  {step.category}
                </span>
              </div>
              <p className="text-xs text-gray-500">{step.rationale}</p>
              <p className="text-xs text-indigo-500 mt-0.5">↳ {step.expectedInsight}</p>
            </div>
          </div>
        ))}
      </div>

      {playbook.antiPatterns.length > 0 && (
        <div className="mx-5 mb-5 bg-rose-50 border border-rose-100 rounded-lg p-4">
          <p className="text-xs font-semibold text-rose-700 uppercase tracking-wide mb-2">Questions to avoid</p>
          <ul className="space-y-1.5">
            {playbook.antiPatterns.map((ap) => (
              <li key={ap} className="text-xs text-rose-700 flex gap-2">
                <span className="shrink-0 font-bold">✕</span>
                {ap}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
