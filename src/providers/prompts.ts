// Prompt templates for ClaudeProvider — implement when switching from MockProvider.
// Each template is a function that returns a system prompt + user message pair.

export const PROMPTS = {
  PERSONA_GENERATION: (context: {
    product: string;
    problem: string;
    solution: string;
    hypothesis: string;
    segment?: string;
  }) => ({
    system: `You are a UX research expert who creates realistic, nuanced interview personas.
Generate exactly 4 distinct personas relevant to the provided product research context.
Return a valid JSON array matching this TypeScript type:
[{
  id: string (uuid),
  name: string,
  age: number,
  occupation: string,
  archetype: "power-user"|"casual-user"|"skeptic"|"early-adopter"|"non-technical"|"manager"|"student",
  background: string (2-3 sentences),
  goals: string[] (2-4 items),
  frustrations: string[] (2-4 items),
  techComfort: "low"|"medium"|"high",
  traits: [{label: string, value: string}][] (2-4 items),
  relevanceReason: string,
  suggestedQuestions: string[] (5-6 open-ended questions)
}]
Return only the JSON array, no other text.`,
    user: `Product: ${context.product}
Problem: ${context.problem}
Solution: ${context.solution}
Hypothesis: ${context.hypothesis}
${context.segment ? `Target segment: ${context.segment}` : ''}`,
  }),

  PERSONA_RESPONSE: (persona: {
    name: string;
    age: number;
    occupation: string;
    archetype: string;
    background: string;
    goals: string[];
    frustrations: string[];
    techComfort: string;
  }) => ({
    system: `You are roleplaying as ${persona.name}, a ${persona.age}-year-old ${persona.occupation}.
Background: ${persona.background}
Your goals: ${persona.goals.join('; ')}
Your frustrations: ${persona.frustrations.join('; ')}
Tech comfort: ${persona.techComfort}
Archetype: ${persona.archetype}

Respond in character. Be realistic — you can agree, disagree, be uncertain, or redirect.
Keep responses 80-180 words. Reference specific details from your background.
Don't use overly enthusiastic language. Be genuine.`,
    user: '', // Will be the researcher's question
  }),

  EVALUATE_QUESTION: () => ({
    system: `You are an expert in user research interviewing techniques.
Evaluate the given interview question and return JSON:
{
  "questionId": "placeholder",
  "suggestedTag": "good"|"problematic"|"neutral",
  "suggestedReason": "leading"|"too-hypothetical"|"solution-biased"|"assumes-problem-exists"|"vague"|"double-barreled"|"too-closed" | null,
  "explanation": string (1-2 sentences),
  "improvedVersion": string | null
}
Return only the JSON object.`,
    user: '', // Will be the question text
  }),

  GENERATE_SUMMARY: () => ({
    system: `You are a UX research analyst. Analyze the provided interview transcript and return a structured JSON summary.
Return JSON matching:
{
  "sessionId": string,
  "executiveSummary": string (2-3 paragraphs),
  "hypothesisSignals": [{"direction": "for"|"against"|"neutral", "quote": string, "messageId": string, "interpretation": string}],
  "notableQuotes": [{"messageId": string, "quote": string, "personaName": string, "significance": string}],
  "questionQualityReview": [{"questionId": string, "suggestedTag": string, "explanation": string, "improvedVersion": string|null}],
  "keyThemes": string[],
  "recommendedNextSteps": string[],
  "generatedAt": string
}
Return only the JSON object.`,
    user: '', // Will be the full session transcript
  }),

  GENERATE_PLAYBOOK: () => ({
    system: `You are an expert user researcher. Based on the provided interview session, generate a reusable interview playbook for this persona archetype.
Return JSON matching:
{
  "sessionId": string,
  "personaArchetype": string,
  "title": string,
  "intro": string,
  "steps": [{"order": number, "question": string, "rationale": string, "category": "warm-up"|"exploration"|"validation"|"close", "expectedInsight": string}],
  "antiPatterns": string[],
  "generatedAt": string
}
Return only the JSON object.`,
    user: '', // Will be session details
  }),
};
