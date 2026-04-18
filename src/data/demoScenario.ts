import type { ProjectContext, Persona } from '../types';

export const demoContext: ProjectContext = {
  id: 'demo-001',
  product: 'Linear Companion',
  problem:
    'Software teams lose important decisions and rationale when they switch between tickets, docs, and Slack — causing repeated discussions and slow onboarding',
  solution:
    'An AI-generated "decision log" that automatically surfaces and summarizes key decisions made in ticket comments, linked PRs, and attached docs',
  hypothesis:
    'Engineering team leads will find automated decision logs reduce time spent re-explaining context to new members by at least 30%',
  segment: 'Engineering leads and senior developers at B2B SaaS companies with 10-100 engineers',
  expectedResponse:
    'Users will recognize the problem as painful and be curious about automation, but skeptical about AI accuracy',
  createdAt: '2026-04-18T09:00:00.000Z',
};

export const demoPersonas: Persona[] = [
  {
    id: 'demo-persona-1',
    name: 'Priya Nair',
    age: 38,
    occupation: 'Senior Engineering Manager at a B2B SaaS company (150 employees)',
    archetype: 'power-user',
    background:
      'Priya has been in engineering leadership for 8 years. She currently manages a team of 12 and is obsessive about documentation — she maintains a manually-updated Confluence page for every major project. She has tried and discarded multiple knowledge-management tools over the years.',
    goals: [
      'Reduce onboarding time for new engineers from 3 months to 6 weeks',
      'Create a culture where decisions are documented as a matter of habit',
      'Stop being the single point of failure for institutional knowledge',
    ],
    frustrations: [
      'Documentation tools require discipline to maintain and her team lacks it',
      'Context lives in peoples heads and walks out the door when they leave',
      'Spends too much time in meetings re-litigating decisions already made',
    ],
    techComfort: 'high',
    traits: [
      { label: 'Documentation style', value: 'Highly structured, templates for everything' },
      { label: 'AI tools used', value: 'GitHub Copilot, Grammarly — mostly for productivity' },
      { label: 'Primary concern', value: 'Signal-to-noise ratio in automated tools' },
    ],
    relevanceReason:
      'Priya manages the exact team profile in the hypothesis and has directly felt the problem — she\'ll give rich, nuanced feedback on whether automated decision logs would actually fit into her team\'s workflow.',
    suggestedQuestions: [
      'Walk me through the last time your team made an important decision — how was it captured?',
      'What happens when a new engineer asks "why did we build it this way?"',
      'How much time do you think your team loses per sprint to re-establishing context?',
      'You mentioned maintaining documentation manually — what makes you continue doing that despite the overhead?',
      'If a tool could automatically detect decisions from your Linear tickets, what would make you trust it?',
      'What would a false positive from this tool look like for your team?',
    ],
  },
  {
    id: 'demo-persona-2',
    name: 'Tomás Reyes',
    age: 34,
    occupation: 'Staff Engineer at a Series B SaaS startup (80 employees)',
    archetype: 'skeptic',
    background:
      'Tomás is a highly technical individual contributor who has been with his company since it was 8 people. He\'s deeply skeptical of process tools and believes most organizational problems are cultural, not technological. He practices git-first documentation — detailed commit messages and thorough PR descriptions are his religion.',
    goals: [
      'Keep the codebase readable and self-documenting',
      'Mentor junior engineers on writing good commit messages',
      'Avoid adding more tools to an already overloaded stack',
    ],
    frustrations: [
      'AI tools that hallucinate and get trusted anyway',
      'Teams that use tools as a substitute for clear thinking',
      'Documentation that lives outside the repository and goes stale',
    ],
    techComfort: 'high',
    traits: [
      { label: 'Documentation philosophy', value: 'Code and git history should be the source of truth' },
      { label: 'AI stance', value: 'Pragmatically skeptical — uses GitHub Copilot but verifies everything' },
      { label: 'Primary concern', value: 'False confidence from AI-generated summaries' },
    ],
    relevanceReason:
      'Tomás represents the skeptic voice on engineering teams — his objections will be technically grounded and will stress-test the core value proposition. Winning him over (or understanding his deal-breakers) is critical.',
    suggestedQuestions: [
      'How do you currently handle the "why did we decide this?" question on your team?',
      'What would have to be true for you to trust an AI-generated decision summary?',
      'Tell me about a time a documentation tool failed your team — what went wrong?',
      'If this tool surfaced a decision incorrectly, what would the damage be?',
      'You rely heavily on git history — does that actually solve the problem for new engineers joining?',
      'What would you need to see in the first week of using a tool like this to keep evaluating it?',
    ],
  },
  {
    id: 'demo-persona-3',
    name: 'Zoe Park',
    age: 29,
    occupation: 'Engineering Lead at a growth-stage startup (40 engineers)',
    archetype: 'early-adopter',
    background:
      'Zoe loves experimenting with new tools. She\'s already built a Slack bot that tries to detect decisions in her team\'s channels, and has been using Notion AI for meeting summaries. She\'s excited about AI-powered tooling but has been burned by tools that don\'t respect data privacy or have unreliable uptime.',
    goals: [
      'Cut the time her team spends in synchronous meetings by 30%',
      'Get a tool that works across her distributed team (3 time zones)',
      'Find a trustworthy AI layer for her existing Linear + GitHub workflow',
    ],
    frustrations: [
      'Tools that silo in one app instead of working across the entire stack',
      'AI tools with opaque data practices',
      'Unreliable classification — too many false positives destroys trust quickly',
    ],
    techComfort: 'high',
    traits: [
      { label: 'Current experiment', value: 'Custom Slack bot for decision detection (60% reliable)' },
      { label: 'AI tools used', value: 'Notion AI, GitHub Copilot, Claude for doc drafts' },
      { label: 'Primary concern', value: 'Data privacy and enterprise compliance' },
    ],
    relevanceReason:
      'Zoe is your most likely early customer — she\'s already solving this problem herself. Understanding her workaround\'s limitations and what would make a commercial tool better will sharpen the product.',
    suggestedQuestions: [
      'You\'ve already built something for this — tell me about where your bot falls short.',
      'What does "good enough" accuracy look like for this kind of tool?',
      'How does your distributed team currently handle decision-making across time zones?',
      'What would you need to see on a privacy and data handling FAQ to feel comfortable?',
      'If this tool integrated with Linear and GitHub today, what would you test first?',
      'What would make you switch from your homegrown solution to a commercial product?',
    ],
  },
  {
    id: 'demo-persona-4',
    name: 'David Okonkwo',
    age: 42,
    occupation: 'Senior Software Developer at an enterprise SaaS company (300 employees)',
    archetype: 'casual-user',
    background:
      'David joined his current team 7 months ago after 6 years at a smaller company. The onboarding experience was painful — a codebase with almost no documentation and all the context in the heads of engineers who had been there since the beginning. He\'s motivated to prevent the next engineer from having the same experience.',
    goals: [
      'Get fully up to speed on why the architecture was built the way it was',
      'Leave better trails for the person who comes after him',
      'Stop feeling like the most junior person on the team despite his experience level',
    ],
    frustrations: [
      'Architectural decisions made before he arrived that nobody can explain',
      'Having to interrupt senior engineers with basic "why" questions',
      'A codebase that\'s technically documented but lacks rationale',
    ],
    techComfort: 'medium',
    traits: [
      { label: 'Time at current company', value: '7 months — still in onboarding mode in places' },
      { label: 'Primary use case', value: 'Understanding existing decisions, not capturing new ones' },
      { label: 'Key insight', value: 'Represents the consumer of decision logs, not the producer' },
    ],
    relevanceReason:
      'David represents the end-user persona who benefits from decision logs without being responsible for creating them. His experience reveals whether the value proposition holds for the consumer side of the tool.',
    suggestedQuestions: [
      'What was the hardest part about onboarding to your current team?',
      'When you hit a piece of code you don\'t understand, what do you do?',
      'Tell me about a decision in your codebase you still don\'t understand the rationale for.',
      'If there was a searchable log of why things were built the way they were, how often do you think you\'d use it?',
      'What format would be most useful — timeline view, topic view, or something else?',
      'How would you feel if this tool had missed some decisions — would partial coverage be valuable or frustrating?',
    ],
  },
];
