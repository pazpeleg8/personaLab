import type { QuestionEvaluation, InterviewSession } from '../../types';
import { cn } from '../../utils/cn';

interface Props {
  session: InterviewSession;
  evaluations: QuestionEvaluation[];
}

const TAG_STYLES = {
  good: 'bg-green-100 text-green-700',
  neutral: 'bg-gray-100 text-gray-600',
  problematic: 'bg-red-100 text-red-700',
  untagged: 'bg-gray-50 text-gray-400',
};

export function QuestionQualityTable({ session, evaluations }: Props) {
  const researcherMessages = session.messages.filter((m) => m.role === 'researcher');

  if (researcherMessages.length === 0) return null;

  const evalMap = new Map(evaluations.map((e) => [e.questionId, e]));

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Question</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tag</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Reason</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Suggestion</th>
            </tr>
          </thead>
          <tbody>
            {researcherMessages.map((msg, i) => {
              const eval_ = evalMap.get(msg.id);
              const tag = msg.tag ?? 'untagged';
              return (
                <tr key={msg.id} className={cn('border-b border-gray-50 last:border-0', i % 2 === 0 ? '' : 'bg-gray-50/50')}>
                  <td className="px-5 py-3 text-gray-700 max-w-xs">
                    <p className="line-clamp-2 text-sm">{msg.content}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', TAG_STYLES[tag])}>
                      {tag}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                    {msg.tagReason?.replace(/-/g, ' ') ?? eval_?.suggestedReason?.replace(/-/g, ' ') ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-xs">
                    {eval_?.improvedVersion && (
                      <p className="text-indigo-600 italic">"{eval_.improvedVersion}"</p>
                    )}
                    {!eval_?.improvedVersion && eval_?.explanation && (
                      <p className="text-gray-500">{eval_.explanation}</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
