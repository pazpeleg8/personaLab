import type { ProjectContext, Persona } from '../types';

export const demoContext: ProjectContext = {
  id: 'demo-001',
  product: 'Nomo',
  problem:
    'Freelancers lose hours every week switching between scattered tools — invoicing in one app, project tracking in another, client communication in a third — with no single view of their business health',
  solution:
    'An all-in-one workspace for freelancers that connects client management, project tracking, and invoicing with a live dashboard showing income, pipeline, and utilization',
  hypothesis:
    'Freelancers earning $50k+ annually will pay $20/month for a tool that saves them 3+ hours of admin work per week and gives them confidence they\'re not leaving money on the table',
  segment: 'Independent freelancers and solo consultants earning $50k–$200k/year, 2+ active clients',
  expectedResponse:
    'Users will strongly identify with the admin pain but be skeptical about yet another all-in-one tool after being burned before',
  createdAt: '2026-04-19T09:00:00.000Z',
};

export const demoPersonas: Persona[] = [
  {
    id: 'demo-persona-1',
    name: 'Sofia Martínez',
    age: 31,
    occupation: 'Freelance brand designer, 4 years full-time independent',
    archetype: 'casual-user',
    background:
      'Sofia left a studio job four years ago and built a steady client base through referrals. She\'s good at the work but finds the business side exhausting — she\'s currently using a spreadsheet for invoices, Notion for project tracking, and her inbox as a CRM. She undercharges, often forgets to follow up on late payments, and has no idea what her monthly revenue will be until the invoices clear.',
    goals: [
      'Stop losing money to late or forgotten invoices',
      'Have a clear view of how much work is coming in next month',
      'Spend less than 30 minutes per week on admin',
    ],
    frustrations: [
      'Every "all-in-one" tool she\'s tried has been overkill or under-built',
      'She switched from FreshBooks to Wave and is tired of migrating data',
      'Her accountant has to remind her every quarter that her records are a mess',
    ],
    techComfort: 'medium',
    traits: [
      { label: 'Current stack', value: 'Notion + spreadsheet + Gmail + bank statement at tax time' },
      { label: 'Biggest risk', value: 'Will not adopt anything that requires setup time upfront' },
      { label: 'Win condition', value: 'Sends first invoice in under 5 minutes with no learning curve' },
    ],
    relevanceReason:
      'Sofia is the core target — she feels the pain daily but has low tolerance for complexity. She\'ll test whether the product\'s value is immediately obvious or buried under features.',
    suggestedQuestions: [
      'Walk me through what happens after you finish a client project — how do you get paid?',
      'Tell me about the last time a payment was late. How did you handle it?',
      'What would your freelance business look like if you had to explain its financial health to an investor right now?',
      'You\'ve tried tools before and stopped using them — what caused you to stop?',
      'If you magically had 3 extra hours every week back, what would you do with them?',
      'What would make you trust a new tool enough to put your client data in it?',
    ],
  },
  {
    id: 'demo-persona-2',
    name: 'Marcus Webb',
    age: 39,
    occupation: 'Independent software consultant, specializing in fintech backend systems',
    archetype: 'skeptic',
    background:
      'Marcus bills $250/hour and has more work than he can take. He\'s deeply organized — uses a custom Airtable base he built himself, invoices through Stripe, and tracks time in Toggl. He has tried many "freelancer tools" and found them all too dumbed-down for his needs. He\'s not interested in paying for something that does less than what he already has.',
    goals: [
      'Keep his current system, which he trusts, working smoothly',
      'Eventually find something that integrates with Stripe and his bank natively',
      'Reduce the manual reconciliation he does at month-end',
    ],
    frustrations: [
      'Tools that treat all freelancers as if they\'re inexperienced with money',
      'Pricing based on invoice volume — he sends few invoices but they\'re large',
      'Products that can\'t handle his international clients or multi-currency invoices',
    ],
    techComfort: 'high',
    traits: [
      { label: 'Current system', value: 'Custom Airtable + Stripe + Toggl + personal scripts' },
      { label: 'Conversion blocker', value: 'Will not give up Stripe; needs deep API or native integration' },
      { label: 'Key question', value: 'Does it do more than my current setup, or just look prettier?' },
    ],
    relevanceReason:
      'Marcus represents the power segment — high-value users with established systems. Understanding his deal-breakers reveals what the product needs to offer beyond simplicity to win sophisticates.',
    suggestedQuestions: [
      'Tell me about the Airtable setup you built — what does it do that off-the-shelf tools couldn\'t?',
      'What would have to be true for you to consider replacing even one part of your current stack?',
      'How do you handle clients who pay late, and how much time does that actually take?',
      'You mentioned multi-currency — how often does that come up and how do you manage it now?',
      'What\'s the most annoying recurring task in your business that you haven\'t been able to automate?',
      'If a tool was genuinely better than your Airtable setup, what would the proof look like?',
    ],
  },
  {
    id: 'demo-persona-3',
    name: 'Aisha Oduola',
    age: 26,
    occupation: 'Freelance copywriter and content strategist, 18 months independent',
    archetype: 'early-adopter',
    background:
      'Aisha went full-time freelance after being laid off and grew faster than she expected — she has 6 clients and is starting to feel overwhelmed. She\'s excited about tools and signs up for everything, but rarely sticks with them. She wants to build a "real business" but is anxious about whether her income is sustainable. She has no idea if she\'s charging enough.',
    goals: [
      'Figure out if she can maintain her current income or if she\'s heading for a dry spell',
      'Understand whether she should raise her rates — she suspects she\'s undercharging',
      'Stop dropping balls with clients when she\'s busy',
    ],
    frustrations: [
      'No visibility into her pipeline — she\'s always surprised when work slows down',
      'Imposter syndrome about "doing business right" compared to more experienced freelancers',
      'Signed up for Bonsai, HoneyBook, and Dubsado but abandoned all three within a month',
    ],
    techComfort: 'high',
    traits: [
      { label: 'Adoption pattern', value: 'High initial enthusiasm, churns if not hooked in first week' },
      { label: 'Emotional need', value: 'Reassurance that she\'s running her business correctly' },
      { label: 'Monetization signal', value: 'Will pay if it makes her feel like a "real business owner"' },
    ],
    relevanceReason:
      'Aisha is the highest-intent prospect — she\'s actively looking for a solution and willing to pay. She\'ll reveal whether the product\'s onboarding creates the aha moment quickly enough to prevent churn.',
    suggestedQuestions: [
      'You\'ve tried three similar tools in the past year — what happened each time you stopped using one?',
      'If you had to guess, are you charging the right amount? What makes you uncertain?',
      'Tell me about a moment in the last few months where you felt like your freelance business was out of control.',
      'What does a successful freelance business look like for you in two years?',
      'When you signed up for Bonsai — what were you hoping it would do for you?',
      'What would need to happen in the first week of using a new tool for you to stick with it?',
    ],
  },
  {
    id: 'demo-persona-4',
    name: 'David Kwon',
    age: 44,
    occupation: 'Founder of a 3-person content agency (himself + 2 contract writers)',
    archetype: 'manager',
    background:
      'David started as a freelance writer and gradually built an agency. He\'s technically not a solo freelancer anymore — he manages projects for clients and sub-contracts writers. He uses QuickBooks for accounting (his bookkeeper insists), but manages client relationships and project delivery in a chaotic mix of email threads and a shared Google sheet. He\'s the bottleneck in his own business.',
    goals: [
      'Stop being the only person who knows the status of every project',
      'Give his writers clarity on what\'s due without a daily check-in',
      'Understand his profitability per client, not just total revenue',
    ],
    frustrations: [
      'Client work bleeds into each other — he can\'t tell which clients are profitable',
      'QuickBooks is powerful but too complex for day-to-day visibility',
      'Can\'t easily share project status with clients without manual updates',
    ],
    techComfort: 'medium',
    traits: [
      { label: 'Key need', value: 'Team visibility — not just personal productivity' },
      { label: 'Integration requirement', value: 'Must not replace QuickBooks; has to work alongside it' },
      { label: 'Biggest unlock', value: 'Per-client profitability view he currently has to calculate manually' },
    ],
    relevanceReason:
      'David represents the "outgrowing solo freelancer" segment — he reveals whether the product\'s scope can expand slightly toward small agency use, and where the ceiling of the core freelancer persona actually is.',
    suggestedQuestions: [
      'How do you currently know if a client relationship is profitable or not?',
      'Walk me through what happens when a new project starts — who knows what, and how?',
      'You said QuickBooks is too complex for day-to-day — what do you actually look at every morning to understand your business?',
      'When a writer asks you "what should I work on next?" what does that process look like?',
      'You\'re not quite a freelancer and not quite an agency — what tools have you tried that were built for the wrong version of you?',
      'If a tool could show you one number every Monday morning that would tell you how healthy your business is, what would that number be?',
    ],
  },
];
