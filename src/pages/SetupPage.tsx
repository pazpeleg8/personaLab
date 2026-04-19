import { AppShell } from '../components/layout/AppShell';
import { ContextForm } from '../components/setup/ContextForm';
import { DemoButton } from '../components/setup/DemoButton';
import { useAppContext } from '../hooks/useAppContext';
import { demoContext, demoPersonas } from '../data/demoScenario';
import { useState } from 'react';
import type { ProjectContext } from '../types';
import { KEYS } from '../utils/storage';

const STEPS = [
  { label: 'Generate personas', desc: 'We create 3–5 realistic interview subjects tailored to your context.' },
  { label: 'Simulate an interview', desc: 'Ask questions, get in-character responses, tag question quality.' },
  { label: 'Get a research summary', desc: 'Hypothesis signals, notable quotes, and a reusable playbook.' },
];

export function SetupPage() {
  const { state, dispatch, services } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [initialValues, setInitialValues] = useState<Partial<ProjectContext> | undefined>(state.context ?? undefined);

  const [storedKey] = useState(() => localStorage.getItem(KEYS.API_KEY) ?? '');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const usingClaude = storedKey.length > 0;

  const handleSaveKey = () => {
    const trimmed = apiKeyInput.trim();
    if (!trimmed) return;
    localStorage.setItem(KEYS.API_KEY, trimmed);
    window.location.reload();
  };

  const handleClearKey = () => {
    localStorage.removeItem(KEYS.API_KEY);
    window.location.reload();
  };

  const handleSubmit = async (context: ProjectContext) => {
    setIsLoading(true);
    setError(null);
    dispatch({ type: 'SET_CONTEXT', payload: context });
    dispatch({ type: 'SET_PERSONAS_LOADING', payload: true });
    try {
      const personas = demoLoaded
        ? demoPersonas
        : await services.personaGenerator.generate(context);
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
              <h1 className="text-xl font-semibold text-gray-900 leading-snug">
                Simulate your users before you meet them
              </h1>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Sharpen your questions, surface blind spots, and stress-test your hypotheses — before you spend time with real users.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {STEPS.map((step, i) => (
                <div key={step.label} className="flex gap-3">
                  <span className="text-xs font-semibold text-indigo-400 tabular-nums mt-0.5">0{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{step.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 border-t border-gray-100 pt-4 mb-5">
              Designed to prepare for real interviews, not replace them.
            </p>

            {/* AI Provider */}
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">AI Provider</span>
                {usingClaude ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-300 inline-block" />
                    Claude active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300 inline-block" />
                    Demo mode
                  </span>
                )}
              </div>

              {usingClaude ? (
                <div className="flex items-center justify-between">
                  <p className="text-xs text-indigo-600">Personas and responses are powered by real Claude AI.</p>
                  <button onClick={handleClearKey} className="text-xs text-red-500 hover:text-red-700 underline ml-3 shrink-0">Remove key</button>
                </div>
              ) : (
                <>
                  <p className="text-xs text-indigo-500 mb-2">Add your Anthropic API key to use real Claude instead of mock data.</p>
                  {showApiKey ? (
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveKey()}
                        placeholder="sk-ant-..."
                        className="flex-1 rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-xs font-mono focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-300"
                      />
                      <button onClick={handleSaveKey} disabled={!apiKeyInput.trim()} className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-40">Save</button>
                      <button onClick={() => setShowApiKey(false)} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setShowApiKey(true)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline">
                      + Add API key
                    </button>
                  )}
                </>
              )}
            </div>
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
              <div className="mb-4 px-3 py-2 rounded-lg bg-indigo-50 border border-indigo-100 text-xs text-indigo-600">
                Demo loaded — Nomo freelancer workspace scenario.
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
