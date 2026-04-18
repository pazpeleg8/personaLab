import { AppShell } from '../components/layout/AppShell';
import { ContextForm } from '../components/setup/ContextForm';
import { DemoButton } from '../components/setup/DemoButton';
import { useAppContext } from '../hooks/useAppContext';
import { demoContext } from '../data/demoScenario';
import { useState } from 'react';
import type { ProjectContext } from '../types';

const STEPS = [
  { icon: '🎭', label: 'Generate personas', desc: 'We create 3–5 realistic interview subjects tailored to your context.' },
  { icon: '💬', label: 'Simulate an interview', desc: 'Ask questions, get in-character responses, tag question quality.' },
  { icon: '📋', label: 'Get a research summary', desc: 'Hypothesis signals, notable quotes, and a reusable playbook.' },
];

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
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

        {/* Left — explainer */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-28">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 leading-snug">
                Interview personas before you interview people
              </h1>
            </div>

            <div className="space-y-3 mb-6">
              {STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <span className="text-base">{step.icon}</span>
                  <span className="text-xs font-bold text-indigo-300 tabular-nums">0{i + 1}</span>
                  <span className="text-sm text-gray-600">{step.label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-amber-600">
              ⚠ Prepare for real interviews — not replace them.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Your research context</h2>
                <p className="text-xs text-gray-400 mt-0.5">The more specific, the better your personas.</p>
              </div>
              <DemoButton onLoad={loadDemo} />
            </div>

            {demoLoaded && (
              <div className="mb-4 px-3 py-2 rounded-lg bg-indigo-50 border border-indigo-100 text-xs text-indigo-600 flex items-center gap-2">
                <span>⚡</span>
                Demo loaded — Linear Companion decision log scenario.
              </div>
            )}

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
        </div>

      </div>
    </AppShell>
  );
}
