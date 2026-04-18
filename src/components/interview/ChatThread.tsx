import { useEffect, useRef } from 'react';
import type { Message, QuestionTag, TagReason } from '../../types';
import { MessageBubble } from './MessageBubble';

interface Props {
  messages: Message[];
  personaName: string;
  pendingResponse: boolean;
  onTag: (messageId: string, tag: QuestionTag, reason?: TagReason) => void;
}

export function ChatThread({ messages, personaName, pendingResponse, onTag }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, pendingResponse]);

  const lastResearcherId = [...messages].reverse().find((m) => m.role === 'researcher')?.id;

  return (
    <div className="flex flex-col gap-4 py-4">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          personaName={personaName}
          isLastResearcher={msg.id === lastResearcherId}
          onTag={
            msg.role === 'researcher'
              ? (tag, reason) => onTag(msg.id, tag, reason)
              : undefined
          }
        />
      ))}

      {pendingResponse && (
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-gray-600">{personaName[0]}</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
