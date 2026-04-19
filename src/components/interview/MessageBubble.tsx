import type { Message, QuestionTag, TagReason } from '../../types';
import { cn } from '../../utils/cn';
import { TagSelector } from './TagSelector';
import { formatTime } from '../../utils/formatters';

interface Props {
  message: Message;
  personaName: string;
  onTag?: (tag: QuestionTag, reason?: TagReason) => void;
  isLastResearcher?: boolean;
}

export function MessageBubble({ message, personaName, onTag, isLastResearcher }: Props) {
  const isResearcher = message.role === 'researcher';

  return (
    <div className={cn('flex flex-col', isResearcher ? 'items-end' : 'items-start')}>
      <div className="flex items-end gap-2">
        {!isResearcher && (
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mb-0.5">
            <span className="text-xs font-semibold text-gray-600">{personaName[0]}</span>
          </div>
        )}
        <div
          className={cn(
            'max-w-sm rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
            isResearcher
              ? 'bg-indigo-600 text-white rounded-br-sm'
              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
          )}
        >
          {message.content}
        </div>
        {isResearcher && (
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mb-0.5">
            <span className="text-xs font-semibold text-indigo-600">Y</span>
          </div>
        )}
      </div>

      <span className={cn('text-xs text-gray-400 mt-1', isResearcher ? 'pr-9' : 'pl-9')}>
        {formatTime(message.timestamp)}
      </span>

      {isResearcher && onTag && (
        <div className={cn('pr-9 mt-1', !isLastResearcher && 'opacity-60 hover:opacity-100 transition-opacity')}>
          <TagSelector
            currentTag={message.tag ?? 'untagged'}
            currentReason={message.tagReason}
            onChange={(tag, reason) => onTag(tag, reason)}
          />
        </div>
      )}
    </div>
  );
}
