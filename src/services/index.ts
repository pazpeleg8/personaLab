import type { AIProvider } from '../providers/AIProvider';
import { PersonaGeneratorService } from './personaGenerator';
import { PersonaResponderService } from './personaResponder';
import { QuestionEvaluatorService } from './questionEvaluator';
import { InterviewSummaryService } from './interviewSummary';
import { PlaybookGeneratorService } from './playbookGenerator';

export function createServices(provider: AIProvider) {
  return {
    personaGenerator: new PersonaGeneratorService(provider),
    personaResponder: new PersonaResponderService(provider),
    questionEvaluator: new QuestionEvaluatorService(provider),
    interviewSummary: new InterviewSummaryService(provider),
    playbookGenerator: new PlaybookGeneratorService(provider),
  };
}

export type Services = ReturnType<typeof createServices>;
