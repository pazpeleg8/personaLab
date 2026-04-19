import { createContext, useReducer, useEffect, type ReactNode } from 'react';
import type { ProjectContext, Persona, InterviewSession, InterviewSummary, Playbook, QuestionEvaluation } from '../types';
import type { Services } from '../services';
import type { AppAction } from './actions';
import { reducer } from './reducer';
import { KEYS, saveSlice, loadSlice, checkVersion } from '../utils/storage';

export interface AppState {
  context: ProjectContext | null;
  generatedPersonas: Persona[];
  selectedPersona: Persona | null;
  personasLoading: boolean;
  session: InterviewSession | null;
  pendingResponse: boolean;
  summary: InterviewSummary | null;
  playbook: Playbook | null;
  summaryLoading: boolean;
  currentPage: 'setup' | 'persona-select' | 'interview' | 'summary';
  evaluations: Record<string, QuestionEvaluation>;
}

const initialState: AppState = {
  context: null,
  generatedPersonas: [],
  selectedPersona: null,
  personasLoading: false,
  session: null,
  pendingResponse: false,
  summary: null,
  playbook: null,
  summaryLoading: false,
  currentPage: 'setup',
  evaluations: {},
};

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  services: Services;
}

export const AppContext = createContext<AppContextValue | null>(null);

interface Props {
  services: Services;
  children: ReactNode;
}

export function AppProvider({ services, children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    checkVersion();
    const session = loadSlice<InterviewSession | null>(KEYS.SESSION, null);
    const selectedPersona = loadSlice<Persona | null>(KEYS.SELECTED_PERSONA, null);
    const restoredPage = loadSlice<AppState['currentPage']>(KEYS.PAGE, 'setup');
    const currentPage: AppState['currentPage'] =
      restoredPage === 'interview' && (!session || !selectedPersona) ? 'setup' :
      restoredPage === 'persona-select' && loadSlice<Persona[]>(KEYS.PERSONAS, []).length === 0 ? 'setup' :
      restoredPage;
    return {
      ...init,
      context: loadSlice<ProjectContext | null>(KEYS.CONTEXT, null),
      generatedPersonas: loadSlice<Persona[]>(KEYS.PERSONAS, []),
      selectedPersona,
      session,
      summary: loadSlice<InterviewSummary | null>(KEYS.SUMMARY, null),
      playbook: loadSlice<Playbook | null>(KEYS.PLAYBOOK, null),
      currentPage,
      evaluations: loadSlice<Record<string, QuestionEvaluation>>(KEYS.EVALUATIONS, {}),
    };
  });

  useEffect(() => {
    saveSlice(KEYS.CONTEXT, state.context);
  }, [state.context]);

  useEffect(() => {
    saveSlice(KEYS.PERSONAS, state.generatedPersonas);
  }, [state.generatedPersonas]);

  useEffect(() => {
    saveSlice(KEYS.SELECTED_PERSONA, state.selectedPersona);
  }, [state.selectedPersona]);

  useEffect(() => {
    if (state.session) {
      const toSave = {
        ...state.session,
        messages: state.session.messages.slice(-80),
      };
      saveSlice(KEYS.SESSION, toSave);
    }
  }, [state.session]);

  useEffect(() => {
    saveSlice(KEYS.SUMMARY, state.summary);
  }, [state.summary]);

  useEffect(() => {
    saveSlice(KEYS.PLAYBOOK, state.playbook);
  }, [state.playbook]);

  useEffect(() => {
    saveSlice(KEYS.PAGE, state.currentPage);
  }, [state.currentPage]);

  useEffect(() => {
    saveSlice(KEYS.EVALUATIONS, state.evaluations);
  }, [state.evaluations]);

  return (
    <AppContext.Provider value={{ state, dispatch, services }}>
      {children}
    </AppContext.Provider>
  );
}
