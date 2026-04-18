import type {
  ProjectContext,
  Persona,
  Message,
  InterviewSession,
  QuestionEvaluation,
  InterviewSummary,
  Playbook,
  QuestionTag,
  TagReason,
} from '../types';
import type { AppState } from './AppContext';

export type AppAction =
  | { type: 'SET_CONTEXT'; payload: ProjectContext }
  | { type: 'SET_PERSONAS'; payload: Persona[] }
  | { type: 'SET_PERSONAS_LOADING'; payload: boolean }
  | { type: 'SELECT_PERSONA'; payload: Persona }
  | { type: 'START_SESSION'; payload: InterviewSession }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'TAG_MESSAGE'; payload: { messageId: string; tag: QuestionTag; reason?: TagReason; note?: string } }
  | { type: 'SET_PENDING_RESPONSE'; payload: boolean }
  | { type: 'END_SESSION' }
  | { type: 'SET_SUMMARY'; payload: InterviewSummary }
  | { type: 'SET_PLAYBOOK'; payload: Playbook }
  | { type: 'SET_SUMMARY_LOADING'; payload: boolean }
  | { type: 'SET_EVALUATION'; payload: QuestionEvaluation }
  | { type: 'NAVIGATE'; payload: AppState['currentPage'] }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<AppState> }
  | { type: 'RESET' };
