import type { QuestionEvaluation, InterviewSession } from '../../types';
import { SummaryCard } from './SummaryCard';
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
    <SummaryCard title="Question quality review">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="pb-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Question</th>
              <th className="pb-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tag</th>
              <th className="pb-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Reason</th>
              <th className="pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Notes</th>
            </tr>
          </thead>
          <tbody>
            {researcherMessages.map((msg) => {
              const eval_ = evalMap.get(msg.id);
              const tag = msg.tag ?? 'untagged';
              return (
                <tr key={msg.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5 pr-4 text-gray-700 max-w-xs">
                    <p className="line-clamp-2">{msg.content}</p>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', TAG_STYLES[tag])}>
                      {tag}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 text-xs text-gray-500">
                    {msg.tagReason?.replace(/-/g, ' ') ?? eval_?.suggestedReason?.replace(/-/g, ' ') ?? '—'}
                  </td>
                  <td className="py-2.5 text-xs text-gray-500 max-w-xs">
                    {eval_?.improvedVersion && (
                      <p className="text-blue-600 italic">"{eval_.improvedVersion}"</p>
                    )}
                    {!eval_?.improvedVersion && eval_?.explanation && (
                      <p>{eval_.explanation}</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SummaryCard>
  );
}
