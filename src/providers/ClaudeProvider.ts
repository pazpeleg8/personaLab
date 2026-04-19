import Anthropic from '@anthropic-ai/sdk';
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
  private client: Anthropic;
  private model = 'claude-sonnet-4-6';

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
  }

  async generatePersonas(context: ProjectContext): Promise<Persona[]> {
    const { system, user } = PROMPTS.PERSONA_GENERATION(context);
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 4000,
      system,
      messages: [{ role: 'user', content: user }],
    });
    const text = (response.content[0] as { type: 'text'; text: string }).text;
    const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    return JSON.parse(cleaned) as Persona[];
  }

  async generateResponse(
    persona: Persona,
    question: string,
    history: Message[],
    _context: ProjectContext
  ): Promise<string> {
    const { system } = PROMPTS.PERSONA_RESPONSE(persona);
    const messages: Anthropic.MessageParam[] = [
      ...history.map((m) => ({
        role: (m.role === 'researcher' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: question },
    ];
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 500,
      system,
      messages,
    });
    return (response.content[0] as { type: 'text'; text: string }).text;
  }

  async evaluateQuestion(question: string, context: ProjectContext): Promise<QuestionEvaluation> {
    const { system } = PROMPTS.EVALUATE_QUESTION();
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 500,
      system,
      messages: [{
        role: 'user',
        content: `Question: "${question}"\nContext: ${context.product} — ${context.problem}`,
      }],
    });
    const text = (response.content[0] as { type: 'text'; text: string }).text;
    const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    return JSON.parse(cleaned) as QuestionEvaluation;
  }

  async generateSummary(session: InterviewSession): Promise<InterviewSummary> {
    const { system } = PROMPTS.GENERATE_SUMMARY();
    const transcript = session.messages
      .map((m) => `${m.role === 'researcher' ? 'Researcher' : session.persona.name}: ${m.content}`)
      .join('\n\n');
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 4000,
      system,
      messages: [{
        role: 'user',
        content: `Session ID: ${session.id}\nPersona: ${session.persona.name} (${session.persona.archetype})\nHypothesis: ${session.context.hypothesis}\n\nTranscript:\n${transcript}`,
      }],
    });
    const text = (response.content[0] as { type: 'text'; text: string }).text;
    const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    return JSON.parse(cleaned) as InterviewSummary;
  }

  async generatePlaybook(session: InterviewSession): Promise<Playbook> {
    const { system } = PROMPTS.GENERATE_PLAYBOOK();
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 3000,
      system,
      messages: [{
        role: 'user',
        content: `Session ID: ${session.id}\nPersona archetype: ${session.persona.archetype}\nProduct: ${session.context.product}\nProblem: ${session.context.problem}\nHypothesis: ${session.context.hypothesis}\nMessage count: ${session.messages.length}`,
      }],
    });
    const text = (response.content[0] as { type: 'text'; text: string }).text;
    const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    return JSON.parse(cleaned) as Playbook;
  }
}
