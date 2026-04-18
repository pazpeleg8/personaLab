import type {
  ProjectContext,
  Persona,
  Message,
  InterviewSession,
  QuestionEvaluation,
  InterviewSummary,
  Playbook,
} from '../types';

export interface AIProvider {
  generatePersonas(context: ProjectContext): Promise<Persona[]>;
  generateResponse(
    persona: Persona,
    question: string,
    history: Message[],
    context: ProjectContext
  ): Promise<string>;
  evaluateQuestion(
    question: string,
    context: ProjectContext
  ): Promise<QuestionEvaluation>;
  generateSummary(session: InterviewSession): Promise<InterviewSummary>;
  generatePlaybook(session: InterviewSession): Promise<Playbook>;
}
