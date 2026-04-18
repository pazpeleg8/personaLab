import type { NotableQuote } from '../../types';
import { SummaryCard } from './SummaryCard';

interface Props {
  quotes: NotableQuote[];
}

export function NotableQuotes({ quotes }: Props) {
  if (quotes.length === 0) return null;

  return (
    <SummaryCard title="Notable quotes">
      <div className="space-y-4">
        {quotes.map((q) => (
          <div key={q.messageId} className="flex gap-3">
            <div className="text-3xl text-gray-200 leading-none font-serif select-none">"</div>
            <div>
              <p className="text-sm text-gray-800 leading-relaxed italic">{q.quote}</p>
              <p className="text-xs text-gray-500 mt-1">
                — {q.personaName} · {q.significance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SummaryCard>
  );
}
