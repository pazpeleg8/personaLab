import type { AppState } from './AppContext';
import type { AppAction } from './actions';

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CONTEXT':
      return { ...state, context: action.payload };

    case 'SET_PERSONAS':
      return { ...state, generatedPersonas: action.payload, personasLoading: false };

    case 'SET_PERSONAS_LOADING':
      return { ...state, personasLoading: action.payload };

    case 'SELECT_PERSONA':
      return { ...state, selectedPersona: action.payload };

    case 'START_SESSION':
      return { ...state, session: action.payload };

    case 'ADD_MESSAGE': {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          messages: [...state.session.messages, action.payload],
        },
      };
    }

    case 'TAG_MESSAGE': {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          messages: state.session.messages.map((m) =>
            m.id === action.payload.messageId
              ? { ...m, tag: action.payload.tag, tagReason: action.payload.reason, tagNote: action.payload.note }
              : m
          ),
        },
      };
    }

    case 'SET_PENDING_RESPONSE':
      return { ...state, pendingResponse: action.payload };

    case 'END_SESSION': {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          status: 'ended',
          endedAt: new Date().toISOString(),
        },
      };
    }

    case 'SET_SUMMARY':
      return { ...state, summary: action.payload, summaryLoading: false };

    case 'SET_PLAYBOOK':
      return { ...state, playbook: action.payload };

    case 'SET_SUMMARY_LOADING':
      return { ...state, summaryLoading: action.payload };

    case 'SET_EVALUATION':
      return {
        ...state,
        evaluations: { ...state.evaluations, [action.payload.questionId]: action.payload },
      };

    case 'NAVIGATE':
      return { ...state, currentPage: action.payload };

    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload };

    case 'RESET':
      return {
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

    default:
      return state;
  }
}
