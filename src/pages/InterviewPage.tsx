import { AppShell } from '../components/layout/AppShell';
import { ChatThread } from '../components/interview/ChatThread';
import { QuestionInput } from '../components/interview/QuestionInput';
import { SuggestedQuestions } from '../components/interview/SuggestedQuestions';
import { PersonaSidebar } from '../components/interview/PersonaSidebar';
import { useAppContext } from '../hooks/useAppContext';
import { useInterview } from '../hooks/useInterview';

export function InterviewPage() {
  const { state } = useAppContext();
  const { session, selectedPersona, pendingResponse, summaryLoading } = state;
  const { sendQuestion, tagMessage, endInterview, suggestedQuestions } = useInterview();

  if (!session || !selectedPersona) {
    return (
      <AppShell currentPage="interview">
        <div className="text-center py-20 text-gray-400">No active session.</div>
      </AppShell>
    );
  }

  const isEnded = session.status === 'ended';

  return (
    <AppShell currentPage="interview">
      <div className="flex gap-5">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Interview with {selectedPersona.name}</h1>
              <p className="text-sm text-gray-500">{session.context.product} · {session.messages.filter((m) => m.role === 'researcher').length} questions asked</p>
            </div>
            {!isEnded && (
              <button
                type="button"
                onClick={endInterview}
                disabled={session.messages.length < 2 || summaryLoading}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {summaryLoading ? 'Generating summary…' : 'End interview'}
              </button>
            )}
          </div>

          {session.messages.length === 0 && !isEnded && (
            <div className="bg-blue-50 rounded-xl p-4 mb-4 text-sm text-blue-700">
              Start the interview by asking {selectedPersona.name} a question, or pick one of the suggested questions below.
            </div>
          )}

          <div className="flex-1 overflow-y-auto min-h-0 max-h-[calc(100vh-320px)] bg-gray-50 rounded-xl px-4">
            <ChatThread
              messages={session.messages}
              personaName={selectedPersona.name}
              pendingResponse={pendingResponse}
              onTag={(id, tag, reason) => tagMessage(id, tag, reason)}
            />
          </div>

          {!isEnded && (
            <div className="mt-4">
              <SuggestedQuestions
                questions={suggestedQuestions}
                onSelect={sendQuestion}
                disabled={pendingResponse}
              />
              <QuestionInput
                onSend={sendQuestion}
                isDisabled={pendingResponse}
                placeholder={`Ask ${selectedPersona.name} a question… (Enter to send)`}
              />
            </div>
          )}

          {isEnded && (
            <div className="mt-4 p-3 rounded-lg bg-gray-100 text-sm text-gray-500 text-center">
              Interview ended. Generating summary…
            </div>
          )}
        </div>

        <PersonaSidebar persona={selectedPersona} />
      </div>
    </AppShell>
  );
}
