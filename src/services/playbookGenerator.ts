import type { AIProvider } from '../providers/AIProvider';
import type { InterviewSession, Playbook } from '../types';

export class PlaybookGeneratorService {
  constructor(private provider: AIProvider) {}

  async generate(session: InterviewSession): Promise<Playbook> {
    try {
      return await this.provider.generatePlaybook(session);
    } catch (err) {
      throw new Error('Failed to generate playbook: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
