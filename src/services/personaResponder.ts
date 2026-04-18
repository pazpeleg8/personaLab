import type { AIProvider } from '../providers/AIProvider';
import type { Persona, Message, ProjectContext } from '../types';

const MAX_HISTORY = 20;

export class PersonaResponderService {
  private provider: AIProvider;
  constructor(provider: AIProvider) { this.provider = provider; }

  async respond(
    persona: Persona,
    question: string,
    history: Message[],
    context: ProjectContext
  ): Promise<string> {
    const trimmedHistory = history.slice(-MAX_HISTORY);
    try {
      return await this.provider.generateResponse(persona, question, trimmedHistory, context);
    } catch (err) {
      throw new Error('Failed to generate persona response: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
