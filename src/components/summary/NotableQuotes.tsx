import type { NotableQuote } from '../../types';

interface Props {
  quotes: NotableQuote[];
}

export function NotableQuotes({ quotes }: Props) {
  if (quotes.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quotes.map((q) => (
        <div key={q.messageId} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-3xl text-indigo-200 leading-none font-serif select-none mb-2">"</div>
          <p className="text-sm text-gray-800 leading-relaxed italic mb-3">{q.quote}</p>
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
              {q.personaName[0]}
            </div>
            <p className="text-xs text-gray-500">{q.personaName} · {q.significance}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
