import { useState } from 'react';

interface Props {
  questions: string[];
  onSelect: (q: string) => void;
  disabled: boolean;
}

const INITIAL_VISIBLE = 3;

export function SuggestedQuestions({ questions, onSelect, disabled }: Props) {
  const [expanded, setExpanded] = useState(false);
  if (questions.length === 0) return null;

  const visible = expanded ? questions : questions.slice(0, INITIAL_VISIBLE);
  const hasMore = questions.length > INITIAL_VISIBLE;

  return (
    <div className="mb-3">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Suggested questions</p>
      <div className="flex flex-col gap-1.5">
        {visible.map((q) => (
          <button
            key={q}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(q)}
            className="text-left text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition leading-snug"
          >
            {q}
          </button>
        ))}
        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="text-xs text-gray-400 hover:text-gray-600 text-left pl-1 transition"
          >
            {expanded ? '↑ Show fewer' : `↓ ${questions.length - INITIAL_VISIBLE} more questions`}
          </button>
        )}
      </div>
    </div>
  );
}
