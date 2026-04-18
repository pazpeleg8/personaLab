import type { AIProvider } from '../providers/AIProvider';
import type { InterviewSession, InterviewSummary } from '../types';

export class InterviewSummaryService {
  constructor(private provider: AIProvider) {}

  async summarize(session: InterviewSession): Promise<InterviewSummary> {
    try {
      return await this.provider.generateSummary(session);
    } catch (err) {
      throw new Error('Failed to generate summary: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
