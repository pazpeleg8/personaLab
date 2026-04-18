import { v4 as uuid } from 'uuid';
import { AppShell } from '../components/layout/AppShell';
import { PageHeader } from '../components/layout/PageHeader';
import { PersonaGrid } from '../components/personas/PersonaGrid';
import { useAppContext } from '../hooks/useAppContext';

export function PersonaSelectPage() {
  const { state, dispatch } = useAppContext();
  const { generatedPersonas, selectedPersona, personasLoading, context } = state;

  const handleContinue = () => {
    if (!selectedPersona || !context) return;
    dispatch({
      type: 'START_SESSION',
      payload: {
        id: uuid(),
        contextId: context.id,
        context,
        persona: selectedPersona,
        messages: [],
        status: 'active',
        startedAt: new Date().toISOString(),
      },
    });
    dispatch({ type: 'NAVIGATE', payload: 'interview' });
  };

  return (
    <AppShell currentPage="persona-select">
      <PageHeader
        title="Choose your interview subject"
        subtitle="Each persona represents a realistic perspective on your product. Select one to interview."
      />

      {personasLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Generating personas…</p>
        </div>
      ) : (
        <>
          <PersonaGrid
            personas={generatedPersonas}
            selectedPersona={selectedPersona}
            onSelect={(p) => dispatch({ type: 'SELECT_PERSONA', payload: p })}
          />

          <div className="mt-6 flex gap-3 justify-between items-center">
            <button
              type="button"
              onClick={() => dispatch({ type: 'NAVIGATE', payload: 'setup' })}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedPersona}
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Start interview →
            </button>
          </div>
        </>
      )}
    </AppShell>
  );
}
