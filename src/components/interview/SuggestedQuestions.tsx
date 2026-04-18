interface Props {
  questions: string[];
  onSelect: (q: string) => void;
  disabled: boolean;
}

export function SuggestedQuestions({ questions, onSelect, disabled }: Props) {
  if (questions.length === 0) return null;

  return (
    <div className="mb-3">
      <p className="text-xs text-gray-400 mb-2">Suggested questions</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((q) => (
          <button
            key={q}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(q)}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition truncate max-w-xs"
            title={q}
          >
            {q.length > 55 ? q.slice(0, 55) + '…' : q}
          </button>
        ))}
      </div>
    </div>
  );
}
