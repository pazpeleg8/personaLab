import type { ProjectContext } from './context';
import type { Persona } from './persona';

export type MessageRole = 'researcher' | 'persona';

export type QuestionTag = 'good' | 'problematic' | 'neutral' | 'untagged';

export type TagReason =
  | 'leading'
  | 'too-hypothetical'
  | 'solution-biased'
  | 'assumes-problem-exists'
  | 'vague'
  | 'double-barreled'
  | 'too-closed';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  tag?: QuestionTag;
  tagReason?: TagReason;
  tagNote?: string;
}

export type InterviewStatus = 'idle' | 'active' | 'ended';

export interface InterviewSession {
  id: string;
  contextId: string;
  context: ProjectContext;
  persona: Persona;
  messages: Message[];
  status: InterviewStatus;
  startedAt: string;
  endedAt?: string;
}
