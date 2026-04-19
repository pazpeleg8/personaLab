import { useState } from 'react';
import { cn } from '../../utils/cn';

interface Props {
  onSend: (question: string) => void;
  isDisabled: boolean;
  placeholder?: string;
}

export function QuestionInput({ onSend, isDisabled, placeholder = 'Ask a question…' }: Props) {
  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || isDisabled) return;
    onSend(trimmed);
    setValue('');
  };

  return (
    <div className="flex gap-2 items-end">
      <textarea
        className={cn(
          'flex-1 resize-none rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition',
          isDisabled && 'bg-gray-50 opacity-60'
        )}
        placeholder={placeholder}
        rows={2}
        value={value}
        disabled={isDisabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <button
        type="button"
        onClick={submit}
        disabled={isDisabled || !value.trim()}
        className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  );
}
