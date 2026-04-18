import { v4 as uuid } from 'uuid';
import type { AIProvider } from './AIProvider';
import type {
  ProjectContext,
  Persona,
  Message,
  InterviewSession,
  QuestionEvaluation,
  InterviewSummary,
  Playbook,
  HypothesisSignal,
  NotableQuote,
  PlaybookStep,
  PersonaArchetype,
} from '../types';
import { detectCategory, pickResponse } from '../data/mockResponses';
import { demoPersonas } from '../data/demoScenario';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const jitter = () => delay(600 + Math.random() * 800);

const PERSONA_POOL: Persona[] = [
  ...demoPersonas,
  {
    id: 'pool-5',
    name: 'Sarah Chen',
    age: 31,
    occupation: 'Product Manager at a mid-size tech company',
    archetype: 'manager',
    background:
      'Sarah bridges engineering and business. She runs weekly syncs and struggles to keep track of decisions made across Slack, Jira, and email.',
    goals: ['Reduce meeting overhead', 'Keep stakeholders aligned', 'Create a single source of truth for product decisions'],
    frustrations: ['Decisions made without her in async threads she catches too late', 'No audit trail when stakeholders challenge past choices'],
    techComfort: 'medium',
    traits: [
      { label: 'Tools used', value: 'Jira, Notion, Slack' },
      { label: 'Decision style', value: 'Collaborative but wants documentation' },
    ],
    relevanceReason: 'Represents cross-functional decision-making and the need for stakeholder-readable logs.',
    suggestedQuestions: [
      'How do you track decisions made in your weekly syncs?',
      'Tell me about the last time a decision caused confusion weeks later.',
      'What does your ideal audit trail look like?',
      'How often do you go back and question past decisions?',
    ],
  },
  {
    id: 'pool-6',
    name: 'Marcus Webb',
    age: 24,
    occupation: 'Junior Software Engineer (1 year experience)',
    archetype: 'student',
    background:
      'Marcus is early in his career and just starting to understand the importance of documentation. He relies heavily on senior teammates and is embarrassed to admit how much context he lacks.',
    goals: ['Understand the codebase faster', 'Ask fewer basic questions', 'Build credibility with senior engineers'],
    frustrations: ['Imposter syndrome around not knowing "why"', 'Reluctance to interrupt busy seniors', 'Docs that explain what but not why'],
    techComfort: 'medium',
    traits: [
      { label: 'Experience level', value: '1 year, recently joined the team' },
      { label: 'Primary need', value: 'Self-serve context without bothering others' },
    ],
    relevanceReason: 'Represents the newest, most acute version of the onboarding problem.',
    suggestedQuestions: [
      "What's the most confusing part of your current codebase to understand?",
      'How do you find out why something was built a certain way?',
      'How often do you hold back a question because you feel you should already know the answer?',
      'What would make you more confident asking questions?',
    ],
  },
  {
    id: 'pool-7',
    name: 'Rachel Torres',
    age: 45,
    occupation: 'VP of Engineering at a scaling startup',
    archetype: 'non-technical',
    background:
      'Rachel transitioned from engineering into leadership 10 years ago. She thinks in terms of team health metrics and quarterly goals, not individual tools.',
    goals: ['Reduce engineer attrition by improving onboarding', 'Create leverage without adding headcount', 'Make knowledge retention a competitive advantage'],
    frustrations: ['Knowledge walks out the door when people leave', 'Onboarding costs that scale with team size', 'Inability to measure "how much do we know?"'],
    techComfort: 'low',
    traits: [
      { label: 'Focus', value: 'Team health and retention metrics' },
      { label: 'Decision lens', value: 'ROI and adoption, not technical fit' },
    ],
    relevanceReason: 'Budget holder and executive sponsor persona — cares about business outcome, not feature list.',
    suggestedQuestions: [
      'How do you measure the cost of lost institutional knowledge today?',
      'What would it take for this to become a budget priority?',
      'How do you think about the ROI of documentation tooling?',
      'What metrics would you use to evaluate whether this tool is working?',
    ],
  },
];

function scorePersonaForContext(persona: Persona, context: ProjectContext): number {
  const text = `${context.product} ${context.problem} ${context.solution} ${context.segment ?? ''}`.toLowerCase();
  let score = 0;
  const keywords: Partial<Record<PersonaArchetype, string[]>> = {
    'power-user': ['engineer', 'technical', 'developer', 'tool', 'workflow', 'process'],
    'skeptic': ['accuracy', 'trust', 'reliable', 'quality', 'ai', 'data'],
    'early-adopter': ['new', 'feature', 'innovate', 'experiment', 'ai', 'automation'],
    'manager': ['team', 'manage', 'lead', 'stakeholder', 'report', 'onboard'],
    'casual-user': ['user', 'simple', 'easy', 'basic', 'casual'],
    'non-technical': ['business', 'stakeholder', 'executive', 'vp', 'non-technical'],
    'student': ['student', 'junior', 'learn', 'new', 'entry'],
  };
  const archetypeKeywords = keywords[persona.archetype] ?? [];
  for (const kw of archetypeKeywords) {
    if (text.includes(kw)) score++;
  }
  return score;
}

export class MockProvider implements AIProvider {
  private usedResponses = new Set<string>();

  async generatePersonas(context: ProjectContext): Promise<Persona[]> {
    await jitter();
    const scored = PERSONA_POOL.map((p) => ({ persona: p, score: scorePersonaForContext(p, context) }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).map((s) => s.persona);
  }

  async generateResponse(
    persona: Persona,
    question: string,
    _history: Message[],
    _context: ProjectContext
  ): Promise<string> {
    await jitter();
    const category = detectCategory(question);
    const response = pickResponse(persona.archetype, category, this.usedResponses);
    this.usedResponses.add(response);
    return response;
  }

  async evaluateQuestion(question: string, _context: ProjectContext): Promise<QuestionEvaluation> {
    await delay(400);
    const q = question.trim().toLowerCase();
    const id = uuid();

    if (/\bwould(n't)? you\b/.test(q) || /\bdon'?t you think\b/.test(q) || /\bshouldn'?t\b/.test(q)) {
      return {
        questionId: id,
        suggestedTag: 'problematic',
        suggestedReason: 'leading',
        explanation: 'This question implies an expected answer, which may bias the response.',
        improvedVersion: question.replace(/wouldn't you|don't you think|shouldn't/gi, '').trim() || 'Tell me more about your experience with this.',
      };
    }

    if (/\bif .{1,30} were\b/.test(q) || /\bimagine if\b/.test(q) || /\bhypothetical\b/.test(q)) {
      return {
        questionId: id,
        suggestedTag: 'problematic',
        suggestedReason: 'too-hypothetical',
        explanation: 'Hypothetical scenarios prompt imagined behavior rather than real experience.',
        improvedVersion: 'Can you tell me about a time you actually encountered this situation?',
      };
    }

    if (/\bfeature\b/.test(q) && !/\bproblem\b/.test(q)) {
      return {
        questionId: id,
        suggestedTag: 'problematic',
        suggestedReason: 'solution-biased',
        explanation: 'The question focuses on a feature before fully exploring the underlying problem.',
        improvedVersion: 'Before we talk about solutions — can you describe the problem in your own words?',
      };
    }

    if (/\band also\b/.test(q) || (q.match(/\?/g) ?? []).length > 1) {
      return {
        questionId: id,
        suggestedTag: 'problematic',
        suggestedReason: 'double-barreled',
        explanation: 'The question asks two things at once. Split it into two separate questions.',
        improvedVersion: question.split(/and also|\?/)[0].trim() + '?',
      };
    }

    const wordCount = q.split(/\s+/).length;
    if (wordCount <= 6 && /\?$/.test(q)) {
      return {
        questionId: id,
        suggestedTag: 'problematic',
        suggestedReason: 'too-closed',
        explanation: 'This yes/no question limits the depth of response you can get.',
        improvedVersion: 'Tell me more about ' + question.replace(/\?$/, '').replace(/^do you|^have you|^is there/i, '').trim() + '.',
      };
    }

    return {
      questionId: id,
      suggestedTag: 'good',
      explanation: 'This question is open-ended and focused on behavior or experience.',
    };
  }

  async generateSummary(session: InterviewSession): Promise<InterviewSummary> {
    await jitter();

    const personaMessages = session.messages.filter((m) => m.role === 'persona');
    const researcherMessages = session.messages.filter((m) => m.role === 'researcher');

    const signals: HypothesisSignal[] = [];

    const positiveKeywords = ['yes', 'definitely', 'absolutely', 'painful', 'frustrat', 'love', 'great', 'useful', 'would use', 'sign up', 'adopt'];
    const negativeKeywords = ['no', "don't think", 'skeptic', 'concern', 'worry', 'trust', 'accurate', 'wrong', 'wouldn\'t', 'not sure', 'doubt'];

    for (const msg of personaMessages) {
      const text = msg.content.toLowerCase();
      const isPositive = positiveKeywords.some((kw) => text.includes(kw));
      const isNegative = negativeKeywords.some((kw) => text.includes(kw));

      if (isPositive && !isNegative) {
        signals.push({
          direction: 'for',
          quote: msg.content.slice(0, 120) + (msg.content.length > 120 ? '...' : ''),
          messageId: msg.id,
          interpretation: `${session.persona.name} expressed genuine recognition of the problem or openness to the solution.`,
        });
      } else if (isNegative && !isPositive) {
        signals.push({
          direction: 'against',
          quote: msg.content.slice(0, 120) + (msg.content.length > 120 ? '...' : ''),
          messageId: msg.id,
          interpretation: `${session.persona.name} raised concerns or expressed skepticism that could indicate adoption friction.`,
        });
      }
    }

    const notableQuotes: NotableQuote[] = personaMessages
      .filter((m) => m.content.length > 60)
      .slice(0, 3)
      .map((m) => ({
        messageId: m.id,
        quote: m.content.length > 150 ? m.content.slice(0, 150) + '...' : m.content,
        personaName: session.persona.name,
        significance: 'This response reveals how ' + session.persona.name + ' currently thinks about this problem space.',
      }));

    const questionReviews: QuestionEvaluation[] = researcherMessages.map((m) => ({
      questionId: m.id,
      suggestedTag: m.tag ?? 'neutral',
      suggestedReason: m.tagReason,
      explanation: m.tag === 'problematic'
        ? `Tagged as problematic${m.tagReason ? ` (${m.tagReason})` : ''} during the interview.`
        : m.tag === 'good'
        ? 'This question was tagged as effective during the interview.'
        : 'No tag applied during the interview.',
    }));

    const forCount = signals.filter((s) => s.direction === 'for').length;
    const againstCount = signals.filter((s) => s.direction === 'against').length;

    const executiveSummary = `Interview with ${session.persona.name} (${session.persona.occupation}) covered ${researcherMessages.length} questions across the problem and solution space.\n\n${session.persona.name} ${forCount > againstCount ? 'generally resonated with the problem framing and showed openness to the solution concept' : againstCount > forCount ? 'raised significant concerns about the approach and would need more evidence before adoption' : 'had a mixed reaction — recognizing the problem but uncertain about the proposed solution'}.\n\nThe interview surfaced ${signals.length} hypothesis signals (${forCount} supporting, ${againstCount} against) and ${notableQuotes.length} notable quotes worth preserving for future reference.`;

    return {
      sessionId: session.id,
      executiveSummary,
      hypothesisSignals: signals.slice(0, 6),
      notableQuotes,
      questionQualityReview: questionReviews,
      keyThemes: [
        'Current workflow and existing workarounds',
        'Trust and accuracy concerns with AI-generated content',
        'Onboarding and institutional knowledge retention',
        'Adoption friction and behavior change requirements',
      ],
      recommendedNextSteps: [
        `Follow up with ${session.persona.name} archetype users about accuracy thresholds`,
        'Explore the onboarding use case more deeply — strongest signal in this interview',
        'Investigate what false positive rate is acceptable before adoption breaks down',
        'Design a pilot structure that would convince a skeptic like this archetype',
      ],
      generatedAt: new Date().toISOString(),
    };
  }

  async generatePlaybook(session: InterviewSession): Promise<Playbook> {
    await jitter();

    const archetypePlaybooks: Record<PersonaArchetype, PlaybookStep[]> = {
      'power-user': [
        { order: 1, question: 'Walk me through your current documentation workflow.', rationale: 'Establishes baseline before probing pain.', category: 'warm-up', expectedInsight: 'What system already exists and where it breaks down.' },
        { order: 2, question: 'When was the last time lost context cost your team real time?', rationale: 'Anchors the problem in a concrete recent experience.', category: 'exploration', expectedInsight: 'Frequency and severity of the problem.' },
        { order: 3, question: 'What workarounds do you currently rely on?', rationale: 'Reveals what value they already see and will compare against.', category: 'exploration', expectedInsight: 'Competing solutions and their gaps.' },
        { order: 4, question: 'If a tool automatically captured decisions, what would need to be true for you to trust it?', rationale: 'Tests adoption criteria without leading.', category: 'validation', expectedInsight: 'Trust threshold and key requirements.' },
        { order: 5, question: 'What would a false positive look like and how much would it matter?', rationale: 'Probes risk tolerance — critical for power users.', category: 'validation', expectedInsight: 'Acceptable error rate.' },
        { order: 6, question: 'Is there anything about the problem we haven\'t talked about that you think is important?', rationale: 'Open close to surface anything missed.', category: 'close', expectedInsight: 'Unknown unknowns.' },
      ],
      'skeptic': [
        { order: 1, question: 'How do you currently handle the "why did we decide this?" question?', rationale: 'Start with their existing solution to show respect for it.', category: 'warm-up', expectedInsight: 'Existing behavior and its perceived adequacy.' },
        { order: 2, question: 'Tell me about a time a documentation tool failed your team.', rationale: 'Skeptics have specific failure experiences — surface them early.', category: 'exploration', expectedInsight: 'Root cause of previous tool failures.' },
        { order: 3, question: 'What would have to be true for you to trust AI-generated summaries of technical decisions?', rationale: 'Directly addresses the trust gap without being defensive.', category: 'validation', expectedInsight: 'Minimum viable trust criteria.' },
        { order: 4, question: 'If this tool surfaced a decision incorrectly, how would you find out?', rationale: 'Tests whether they have a verification mental model.', category: 'validation', expectedInsight: 'Error detection and recovery expectations.' },
        { order: 5, question: 'What would you need to see in the first week to keep evaluating it?', rationale: 'Grounds adoption in observable evidence rather than promises.', category: 'close', expectedInsight: 'Concrete early success criteria.' },
      ],
      'early-adopter': [
        { order: 1, question: "Tell me about the tool you've already built for this — what does it do?", rationale: 'Validate existing investment before probing gaps.', category: 'warm-up', expectedInsight: 'Existing solution quality and coverage.' },
        { order: 2, question: 'Where does your current solution fall short?', rationale: 'Surfaces the gap a new tool needs to fill.', category: 'exploration', expectedInsight: 'Specific failure modes of existing workaround.' },
        { order: 3, question: 'What accuracy level would make this useful versus a liability?', rationale: 'Early adopters have concrete thresholds from prior tools.', category: 'validation', expectedInsight: 'Quantified accuracy requirements.' },
        { order: 4, question: 'What would make you switch from your homegrown solution to something external?', rationale: 'Tests build vs. buy threshold.', category: 'validation', expectedInsight: 'Switching cost and adoption bar.' },
        { order: 5, question: "What's the one integration that would make this a must-have?", rationale: 'Surfaces the integration that unlocks adoption.', category: 'close', expectedInsight: 'Highest-leverage integration point.' },
      ],
      'casual-user': [
        { order: 1, question: 'Tell me about a recent time you needed context you didn\'t have.', rationale: 'Ground the conversation in real experience.', category: 'warm-up', expectedInsight: 'Problem frequency and recency.' },
        { order: 2, question: 'What do you do today when you hit a piece of code you don\'t understand?', rationale: 'Reveals current behavior without leading.', category: 'exploration', expectedInsight: 'Default coping strategy.' },
        { order: 3, question: 'How much time do you think that workaround costs you?', rationale: 'Quantifies the problem without suggesting the answer.', category: 'exploration', expectedInsight: 'Self-assessed cost of the problem.' },
        { order: 4, question: 'If there was a searchable log of decisions, how often do you think you\'d use it?', rationale: 'Tests usage frequency expectation.', category: 'validation', expectedInsight: 'Projected engagement and value.' },
        { order: 5, question: 'What would it look like if this tool failed you?', rationale: 'Surfaces risk model without being abstract.', category: 'close', expectedInsight: 'Failure scenarios and impact.' },
      ],
      'non-technical': [
        { order: 1, question: 'How do decisions get captured in your team today?', rationale: 'Neutral opening that doesn\'t presuppose a problem.', category: 'warm-up', expectedInsight: 'Current state and gaps.' },
        { order: 2, question: 'Tell me about the last time a decision caused confusion weeks after it was made.', rationale: 'Anchors the problem in a recent concrete experience.', category: 'exploration', expectedInsight: 'Real impact of the problem.' },
        { order: 3, question: 'What would "solved" look like to you?', rationale: 'Lets them define success in their own terms.', category: 'validation', expectedInsight: 'Success criteria from their lens.' },
        { order: 4, question: 'If this required no behavior change from your team, would it be valuable?', rationale: 'Tests whether the value holds even with full frictionlessness.', category: 'validation', expectedInsight: 'Core value independent of behavior change.' },
        { order: 5, question: 'Who else in your organization feels this pain?', rationale: 'Maps the stakeholder and buyer landscape.', category: 'close', expectedInsight: 'Buying coalition and champions.' },
      ],
      'manager': [
        { order: 1, question: 'What does your onboarding process look like for new engineers?', rationale: 'Opens the relevant context without leading to the solution.', category: 'warm-up', expectedInsight: 'Current onboarding baseline.' },
        { order: 2, question: 'How do you measure whether onboarding is successful?', rationale: 'Reveals metrics that a solution would need to move.', category: 'exploration', expectedInsight: 'Success metrics they already track.' },
        { order: 3, question: 'When a senior engineer leaves, what knowledge walks out with them?', rationale: 'Reframes the problem around attrition risk, not tools.', category: 'exploration', expectedInsight: 'Perceived value of institutional knowledge.' },
        { order: 4, question: 'If you could measure "how much institutional knowledge does our team have," how would you use that?', rationale: 'Probes appetite for metrics without prescribing them.', category: 'validation', expectedInsight: 'Appetite for knowledge health metrics.' },
        { order: 5, question: 'What would a successful 3-month pilot look like to you?', rationale: 'Grounds the conversation in actionable evaluation criteria.', category: 'close', expectedInsight: 'Pilot structure and success criteria.' },
      ],
      'student': [
        { order: 1, question: 'What\'s the most confusing thing about your current codebase?', rationale: 'Opens with their actual experience, no framing.', category: 'warm-up', expectedInsight: 'Lived experience of the problem.' },
        { order: 2, question: 'How do you find out why something was built a certain way?', rationale: 'Surfaces current coping behavior.', category: 'exploration', expectedInsight: 'Default information-finding strategy.' },
        { order: 3, question: 'How often do you hold back a question because you feel you should know the answer?', rationale: 'Gets at the hidden cost of information gaps.', category: 'exploration', expectedInsight: 'Frequency and emotional cost of imposter syndrome.' },
        { order: 4, question: 'What would make you more confident exploring an unfamiliar part of the codebase?', rationale: 'Lets them articulate the solution space themselves.', category: 'validation', expectedInsight: 'Desired support structure.' },
        { order: 5, question: 'What would you tell a tool like this to do differently than just showing git history?', rationale: 'Tests whether they see incremental value or need transformation.', category: 'close', expectedInsight: 'Feature delta that justifies adoption.' },
      ],
    };

    const steps = archetypePlaybooks[session.persona.archetype] ?? archetypePlaybooks['casual-user'];

    const antiPatternsByArchetype: Record<PersonaArchetype, string[]> = {
      'power-user': ['Leading with the solution before exploring the problem', 'Asking yes/no questions to a persona who has nuanced opinions', 'Skipping the workarounds question — it\'s where their current investment lives'],
      'skeptic': ['Asking "wouldn\'t this be better?" — they\'ll just say no', 'Defending the tool concept before understanding their objections', 'Hypothetical scenarios — they only trust demonstrated behavior'],
      'early-adopter': ['Underselling — they want to know the ambitious vision', 'Skipping the "what have you already tried?" question', 'Not asking about data privacy early — it\'s a deal-breaker'],
      'casual-user': ['Assuming they have a strong opinion — ask first', 'Using technical jargon without explanation', 'Going deep on edge cases — they care about the core 80% use case'],
      'non-technical': ['Asking about technical implementation details', 'Using engineering terms without translation', 'Skipping the "who else feels this pain?" question'],
      'manager': ['Jumping to individual features before understanding team-level metrics', 'Not asking about procurement and budget process', 'Ignoring the retention/attrition framing — it\'s their primary lens'],
      'student': ['Being too abstract — they need concrete examples', 'Asking about ROI — they don\'t think in those terms', 'Assuming they know their own behavior — ask them to tell stories, not analyze'],
    };

    return {
      sessionId: session.id,
      personaArchetype: session.persona.archetype,
      title: `Interview guide: ${session.persona.archetype} × ${session.context.product}`,
      intro: `This playbook is optimized for interviewing ${session.persona.archetype} personas about ${session.context.product}. It\'s ordered to build rapport before probing for problem depth, and validation questions appear only after the problem is clearly established.`,
      steps,
      antiPatterns: antiPatternsByArchetype[session.persona.archetype] ?? [],
      generatedAt: new Date().toISOString(),
    };
  }
}
