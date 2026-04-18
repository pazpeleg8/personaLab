import type { AIProvider } from '../providers/AIProvider';
import type { ProjectContext, QuestionEvaluation } from '../types';

export class QuestionEvaluatorService {
  constructor(private provider: AIProvider) {}

  async evaluate(question: string, context: ProjectContext): Promise<QuestionEvaluation> {
    try {
      return await this.provider.evaluateQuestion(question, context);
    } catch (err) {
      throw new Error('Failed to evaluate question: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
