import type { AIProvider } from '../providers/AIProvider';
import type { ProjectContext, Persona } from '../types';

export class PersonaGeneratorService {
  private provider: AIProvider;
  constructor(provider: AIProvider) { this.provider = provider; }

  async generate(context: ProjectContext): Promise<Persona[]> {
    try {
      return await this.provider.generatePersonas(context);
    } catch (err) {
      throw new Error('Failed to generate personas: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
}
