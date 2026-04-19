import { AppShell } from '../components/layout/AppShell';
import { HypothesisSummary } from '../components/summary/HypothesisSummary';
import { NotableQuotes } from '../components/summary/NotableQuotes';
import { QuestionQualityTable } from '../components/summary/QuestionQualityTable';
import { PlaybookSection } from '../components/summary/PlaybookSection';
import { useAppContext } from '../hooks/useAppContext';
import { ArchetypeBadge } from '../components/shared/ArchetypeBadge';

function StatPill({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className={`flex flex-col items-center px-5 py-3 rounded-xl ${color}`}>
      <span className="text-2xl font-bold tabular-nums">{value}</span>
      <span className="text-xs mt-0.5 opacity-80">{label}</span>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{icon}</span>
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function SummaryPage() {
  const { state, dispatch } = useAppContext();
  const { summary, playbook, session, summaryLoading, evaluations } = state;

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    import('../utils/storage').then(({ clearAll }) => clearAll());
  };

  if (summaryLoading) {
    return (
      <AppShell currentPage="summary">
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">Analyzing your interview…</p>
            <p className="text-xs text-gray-400 mt-1">Building summary, signals, and playbook</p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!summary) {
    return (
      <AppShell currentPage="summary">
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <p className="text-sm font-medium text-gray-700">Summary could not be generated.</p>
          <p className="text-xs text-gray-400">The AI call may have failed or timed out.</p>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => dispatch({ type: 'NAVIGATE', payload: 'interview' })}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              ← Back to interview
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Start over
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  const questionCount = session?.messages.filter((m) => m.role === 'researcher').length ?? 0;
  const forCount = summary.hypothesisSignals.filter((s) => s.direction === 'for').length;
  const againstCount = summary.hypothesisSignals.filter((s) => s.direction === 'against').length;
  const goodQuestions = summary.questionQualityReview.filter((q) => q.suggestedTag === 'good').length;
  const problemQuestions = summary.questionQualityReview.filter((q) => q.suggestedTag === 'problematic').length;

  return (
    <AppShell currentPage="summary">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">Interview summary</p>
            <h1 className="text-2xl font-bold text-gray-900">
              {session?.context.product ?? 'Interview'}
            </h1>
            {session && (
              <div className="flex items-center gap-2 mt-1.5">
                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                  {session.persona.name[0]}
                </div>
                <span className="text-sm text-gray-500">with {session.persona.name}</span>
                <ArchetypeBadge archetype={session.persona.archetype} />
              </div>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => dispatch({ type: 'NAVIGATE', payload: 'interview' })}
              className="text-sm px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-sm px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              New interview
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex gap-3 mt-5 flex-wrap">
          <StatPill value={questionCount} label="questions asked" color="bg-gray-100 text-gray-700" />
          <StatPill value={forCount} label="signals for" color="bg-green-100 text-green-700" />
          <StatPill value={againstCount} label="signals against" color="bg-red-100 text-red-700" />
          <StatPill value={goodQuestions} label="good questions" color="bg-indigo-100 text-indigo-700" />
          {problemQuestions > 0 && (
            <StatPill value={problemQuestions} label="to improve" color="bg-amber-100 text-amber-700" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8">

        {/* Executive summary */}
        <Section title="What happened" icon="📋">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{summary.executiveSummary}</p>
            {summary.keyThemes.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                {summary.keyThemes.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">{t}</span>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* Hypothesis signals */}
        <Section title="Hypothesis signals" icon="🧪">
          <HypothesisSummary signals={summary.hypothesisSignals} />
        </Section>

        {/* Notable quotes */}
        {summary.notableQuotes.length > 0 && (
          <Section title="Notable quotes" icon="💬">
            <NotableQuotes quotes={summary.notableQuotes} />
          </Section>
        )}

        {/* Question quality */}
        {session && (
          <Section title="Question quality review" icon="🔍">
            <QuestionQualityTable session={session} evaluations={Object.values(evaluations)} />
          </Section>
        )}

        {/* Next steps */}
        {summary.recommendedNextSteps.length > 0 && (
          <Section title="Recommended next steps" icon="→">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <ul className="space-y-3">
                {summary.recommendedNextSteps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}

        {/* Playbook */}
        {playbook && (
          <Section title="Interview playbook" icon="📖">
            <PlaybookSection playbook={playbook} />
          </Section>
        )}

      </div>
    </AppShell>
  );
}
