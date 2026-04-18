import { useState } from 'react';
import type { QuestionTag, TagReason } from '../../types';
import { cn } from '../../utils/cn';

const TAG_REASONS: { value: TagReason; label: string }[] = [
  { value: 'leading', label: 'Leading' },
  { value: 'too-hypothetical', label: 'Too hypothetical' },
  { value: 'solution-biased', label: 'Solution-biased' },
  { value: 'assumes-problem-exists', label: 'Assumes problem' },
  { value: 'vague', label: 'Vague' },
  { value: 'double-barreled', label: 'Double-barreled' },
  { value: 'too-closed', label: 'Too closed' },
];

interface Props {
  currentTag: QuestionTag;
  currentReason?: TagReason;
  onChange: (tag: QuestionTag, reason?: TagReason) => void;
}

export function TagSelector({ currentTag, currentReason, onChange }: Props) {
  const [showReasons, setShowReasons] = useState(currentTag === 'problematic');

  const handleTag = (tag: QuestionTag) => {
    if (tag === 'problematic') {
      setShowReasons(true);
      onChange(tag);
    } else {
      setShowReasons(false);
      onChange(tag, undefined);
    }
  };

  return (
    <div className="mt-1 flex flex-col gap-1.5">
      <div className="flex gap-1.5 flex-wrap">
        <span className="text-xs text-gray-400 self-center">Tag:</span>
        {(['good', 'neutral', 'problematic'] as QuestionTag[]).map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTag(tag)}
            className={cn(
              'text-xs px-2.5 py-1 rounded-full border transition',
              currentTag === tag && tag === 'good' && 'bg-green-100 border-green-300 text-green-700 font-medium',
              currentTag === tag && tag === 'neutral' && 'bg-gray-100 border-gray-300 text-gray-600 font-medium',
              currentTag === tag && tag === 'problematic' && 'bg-red-100 border-red-300 text-red-700 font-medium',
              currentTag !== tag && 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {showReasons && (
        <div className="flex gap-1.5 flex-wrap pl-7">
          {TAG_REASONS.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => onChange('problematic', r.value)}
              className={cn(
                'text-xs px-2 py-0.5 rounded-full border transition',
                currentReason === r.value
                  ? 'bg-red-600 border-red-600 text-white font-medium'
                  : 'bg-white border-red-200 text-red-600 hover:bg-red-50'
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
