import { AppShell } from '../components/layout/AppShell';
import { PageHeader } from '../components/layout/PageHeader';
import { ContextForm } from '../components/setup/ContextForm';
import { DemoButton } from '../components/setup/DemoButton';
import { useAppContext } from '../hooks/useAppContext';
import { demoContext } from '../data/demoScenario';
import { useState } from 'react';
import type { ProjectContext } from '../types';

export function SetupPage() {
  const { state, dispatch, services } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [initialValues, setInitialValues] = useState<Partial<ProjectContext> | undefined>(state.context ?? undefined);

  const handleSubmit = async (context: ProjectContext) => {
    setIsLoading(true);
    setError(null);
    dispatch({ type: 'SET_CONTEXT', payload: context });
    dispatch({ type: 'SET_PERSONAS_LOADING', payload: true });
    try {
      const personas = await services.personaGenerator.generate(context);
      dispatch({ type: 'SET_PERSONAS', payload: personas });
      dispatch({ type: 'NAVIGATE', payload: 'persona-select' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate personas');
      dispatch({ type: 'SET_PERSONAS_LOADING', payload: false });
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemo = () => {
    setInitialValues(demoContext);
    setDemoLoaded(true);
    setFormKey((k) => k + 1);
  };

  return (
    <AppShell currentPage="setup">
      <div className="max-w-2xl mx-auto">
        <PageHeader
          title="Define your research context"
          subtitle="Describe what you're building and what you want to learn. The more specific, the better your personas."
        />

        <div className="mb-6">
          <DemoButton onLoad={loadDemo} />
          {demoLoaded && (
            <p className="mt-2 text-xs text-blue-600">Demo scenario loaded — Linear Companion decision log tool.</p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}

        <ContextForm
          key={formKey}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </AppShell>
  );
}
