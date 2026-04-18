// ClaudeProvider — swap in by changing one line in App.tsx:
//   const provider: AIProvider = new ClaudeProvider(import.meta.env.VITE_ANTHROPIC_API_KEY)
//
// Install SDK first: npm install @anthropic-ai/sdk
// Add VITE_ANTHROPIC_API_KEY to .env.local

import type { AIProvider } from './AIProvider';
import type {
  ProjectContext,
  Persona,
  Message,
  InterviewSession,
  QuestionEvaluation,
  InterviewSummary,
  Playbook,
} from '../types';
import { PROMPTS } from './prompts';

export class ClaudeProvider implements AIProvider {
  // private client: Anthropic;
  private model = 'claude-sonnet-4-6';

  constructor(_apiKey: string) {
    // this.client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
    console.log('ClaudeProvider initialized — model:', this.model);
  }

  async generatePersonas(_context: ProjectContext): Promise<Persona[]> {
    // const { system, user } = PROMPTS.PERSONA_GENERATION(_context);
    // const response = await this.client.messages.create({
    //   model: this.model,
    //   max_tokens: 4000,
    //   system,
    //   messages: [{ role: 'user', content: user }],
    // });
    // const text = (response.content[0] as { type: 'text'; text: string }).text;
    // return JSON.parse(text) as Persona[];
    void PROMPTS;
    throw new Error('ClaudeProvider.generatePersonas not yet implemented');
  }

  async generateResponse(
    _persona: Persona,
    _question: string,
    _history: Message[],
    _context: ProjectContext
  ): Promise<string> {
    // const { system } = PROMPTS.PERSONA_RESPONSE(_persona);
    // const messages = [
    //   ..._history.map((m) => ({ role: m.role === 'researcher' ? 'user' : 'assistant', content: m.content })),
    //   { role: 'user', content: _question },
    // ];
    // const response = await this.client.messages.create({ model: this.model, max_tokens: 500, system, messages });
    // return (response.content[0] as { type: 'text'; text: string }).text;
    throw new Error('ClaudeProvider.generateResponse not yet implemented');
  }

  async evaluateQuestion(_question: string, _context: ProjectContext): Promise<QuestionEvaluation> {
    // const { system } = PROMPTS.EVALUATE_QUESTION();
    // const response = await this.client.messages.create({
    //   model: this.model, max_tokens: 500, system,
    //   messages: [{ role: 'user', content: `Question: "${_question}"\nContext: ${_context.product} — ${_context.problem}` }],
    // });
    // const text = (response.content[0] as { type: 'text'; text: string }).text;
    // return JSON.parse(text) as QuestionEvaluation;
    throw new Error('ClaudeProvider.evaluateQuestion not yet implemented');
  }

  async generateSummary(_session: InterviewSession): Promise<InterviewSummary> {
    throw new Error('ClaudeProvider.generateSummary not yet implemented');
  }

  async generatePlaybook(_session: InterviewSession): Promise<Playbook> {
    throw new Error('ClaudeProvider.generatePlaybook not yet implemented');
  }
}
