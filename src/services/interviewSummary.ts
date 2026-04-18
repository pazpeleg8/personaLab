import type { AIProvider } from '../providers/AIProvider';
import type { InterviewSession, InterviewSummary } from '../types';

export class InterviewSummaryService {
  private provider: AIProvider;
  constructor(provider: AIProvider) { this.provider = provider; }

  async summarize(session: InterviewSession): Promise<InterviewSummary> {
    try {
      return await this.provider.generateSummary(session);
    } catch (err) {
      throw new Error('Failed to generate summary: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
