import { useState } from 'react';
import { ChatThread } from '../components/interview/ChatThread';
import { QuestionInput } from '../components/interview/QuestionInput';
import { SuggestedQuestions } from '../components/interview/SuggestedQuestions';
import { PersonaDetail } from '../components/personas/PersonaDetail';
import { useAppContext } from '../hooks/useAppContext';
import { useInterview } from '../hooks/useInterview';
import { AppShell } from '../components/layout/AppShell';
import { ArchetypeBadge } from '../components/shared/ArchetypeBadge';

export function InterviewPage() {
  const { state } = useAppContext();
  const { session, selectedPersona, pendingResponse, summaryLoading } = state;
  const { sendQuestion, tagMessage, endInterview, suggestedQuestions } = useInterview();
  const [showSuggested, setShowSuggested] = useState(true);
  const [showPersonaDetail, setShowPersonaDetail] = useState(false);

  if (!session || !selectedPersona) {
    return (
      <AppShell currentPage="interview">
        <div className="text-center py-20 text-gray-400">No active session.</div>
      </AppShell>
    );
  }

  const isEnded = session.status === 'ended';
  const questionCount = session.messages.filter((m) => m.role === 'researcher').length;

  return (
    <AppShell currentPage="interview" fullHeight>
      <div className="flex flex-col h-full">

        {/* Persona strip — clickable to show details */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100 bg-white -mx-6 px-6 shrink-0">
          <button
            type="button"
            onClick={() => setShowPersonaDetail(true)}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-xl px-2 py-1.5 -ml-2 transition group"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600 shrink-0">
              {selectedPersona.name[0]}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{selectedPersona.name}</span>
                <ArchetypeBadge archetype={selectedPersona.archetype} />
              </div>
              <p className="text-xs text-gray-400 group-hover:text-gray-500 transition">
                {selectedPersona.occupation} · <span className="text-indigo-400">View profile</span>
              </p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 tabular-nums">
              {questionCount} question{questionCount !== 1 ? 's' : ''}
            </span>

            {!isEnded && (
              <button
                type="button"
                onClick={endInterview}
                disabled={questionCount < 1 || summaryLoading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {summaryLoading ? 'Generating…' : 'End interview'}
              </button>
            )}
          </div>
        </div>

        {/* Main content row */}
        <div className="flex flex-1 min-h-0">

          {/* Chat column */}
          <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
            <div className="flex-1 overflow-y-auto px-4">
              {session.messages.length === 0 && !isEnded ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-600">
                    {selectedPersona.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{selectedPersona.name} is ready</p>
                    <p className="text-xs text-gray-400 mt-1">Pick a question from the list or type your own →</p>
                  </div>
                </div>
              ) : (
                <ChatThread
                  messages={session.messages}
                  personaName={selectedPersona.name}
                  pendingResponse={pendingResponse}
                  onTag={(id, tag, reason) => tagMessage(id, tag, reason)}
                />
              )}
            </div>

            {!isEnded && (
              <div className="px-4 py-3 border-t border-gray-100 bg-white shrink-0">
                <QuestionInput
                  onSend={sendQuestion}
                  isDisabled={pendingResponse}
                  placeholder={`Ask ${selectedPersona.name} a question… (Enter to send)`}
                />
              </div>
            )}

            {isEnded && (
              <div className="px-4 py-3 border-t border-indigo-100 bg-indigo-50 shrink-0 text-center text-sm text-indigo-500">
                Interview complete · generating summary…
              </div>
            )}
          </div>

          {/* Suggested questions panel */}
          {!isEnded && (
            <div className="w-72 border-l border-gray-100 bg-white flex flex-col shrink-0">
              <button
                type="button"
                onClick={() => setShowSuggested((s) => !s)}
                className="flex items-center justify-between px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700 border-b border-gray-100 transition"
              >
                <span>Suggested questions</span>
                <span>{showSuggested ? '↑' : '↓'}</span>
              </button>
              {showSuggested && (
                <div className="flex-1 overflow-y-auto p-4">
                  {suggestedQuestions.length > 0 ? (
                    <SuggestedQuestions
                      questions={suggestedQuestions}
                      onSelect={sendQuestion}
                      disabled={pendingResponse}
                    />
                  ) : (
                    <p className="text-xs text-gray-400 italic">All suggested questions have been asked.</p>
                  )}
                </div>
              )}

              {/* Interview tip */}
              <div className="px-4 py-3 border-t border-gray-100 bg-amber-50">
                <p className="text-xs text-amber-700 leading-relaxed">
                  <span className="font-semibold">Tip:</span> Tag each question after asking to get a quality review in the summary.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPersonaDetail && (
        <PersonaDetail persona={selectedPersona} onClose={() => setShowPersonaDetail(false)} />
      )}
    </AppShell>
  );
}
