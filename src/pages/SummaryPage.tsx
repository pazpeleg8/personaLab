import { AppShell } from '../components/layout/AppShell';
import { PageHeader } from '../components/layout/PageHeader';
import { SummaryCard } from '../components/summary/SummaryCard';
import { HypothesisSummary } from '../components/summary/HypothesisSummary';
import { NotableQuotes } from '../components/summary/NotableQuotes';
import { QuestionQualityTable } from '../components/summary/QuestionQualityTable';
import { PlaybookSection } from '../components/summary/PlaybookSection';
import { useAppContext } from '../hooks/useAppContext';

export function SummaryPage() {
  const { state, dispatch } = useAppContext();
  const { summary, playbook, session, summaryLoading, evaluations } = state;

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    import('../utils/storage').then(({ clearAll }) => clearAll());
  };

  if (summaryLoading || !summary) {
    return (
      <AppShell currentPage="summary">
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Analyzing interview and generating summary…</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell currentPage="summary">
      <PageHeader
        title="Interview summary"
        subtitle={session ? `Interview with ${session.persona.name} · ${session.context.product}` : 'Interview complete'}
      />

      <div className="flex flex-col gap-5">
        <SummaryCard title="Executive summary">
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {summary.executiveSummary}
          </div>

          {summary.keyThemes.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key themes</p>
              <div className="flex flex-wrap gap-2">
                {summary.keyThemes.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          )}
        </SummaryCard>

        <HypothesisSummary signals={summary.hypothesisSignals} />

        <NotableQuotes quotes={summary.notableQuotes} />

        {session && (
          <QuestionQualityTable
            session={session}
            evaluations={Object.values(evaluations)}
          />
        )}

        {playbook && <PlaybookSection playbook={playbook} />}

        {summary.recommendedNextSteps.length > 0 && (
          <SummaryCard title="Recommended next steps">
            <ul className="space-y-2">
              {summary.recommendedNextSteps.map((step, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-gray-700">
                  <span className="text-blue-500 font-semibold shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </SummaryCard>
        )}

        <div className="pt-2 flex justify-between items-center">
          <button
            type="button"
            onClick={() => dispatch({ type: 'NAVIGATE', payload: 'interview' })}
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            ← Back to interview
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Start new interview
          </button>
        </div>
      </div>
    </AppShell>
  );
}
