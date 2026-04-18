import type { PersonaArchetype } from '../types';

export type ResponseCategory =
  | 'workflow-current'
  | 'problem-recognition'
  | 'frequency'
  | 'workarounds'
  | 'ideal-solution'
  | 'skepticism'
  | 'adoption-willingness'
  | 'generic';

type ResponseBank = Record<PersonaArchetype, Record<ResponseCategory, string[]>>;

export const RESPONSE_BANK: ResponseBank = {
  'power-user': {
    'workflow-current': [
      "I have a pretty elaborate system, honestly. I keep a running Confluence page for each project where I manually paste in key decisions with dates. It's tedious but it's mine and I trust it.",
      "I live in keyboard shortcuts. I've got Notion open at all times, my own tagging system, and I do a 15-minute 'decision log' at the end of each sprint. It's a lot of overhead but it's the only way I stay sane.",
      "My workflow is probably over-engineered. I cross-reference GitHub issues with an internal wiki page. The problem is it requires discipline to maintain, which not everyone on my team has.",
    ],
    'problem-recognition': [
      "Oh, the lost context problem is real. We had a situation last quarter where a new engineer reopened a debate we'd already had — and spent two weeks building something we'd explicitly decided against six months ago.",
      "It's painful. The worst is when you're onboarding someone new and they ask 'why did we do X?' and you just... don't remember. You have to go archaeology through Slack DMs and old PRs.",
      "It's a constant drain. I'd say I spend maybe 20-30% of my time just re-establishing context — either for myself or explaining things to others.",
    ],
    'frequency': [
      "Every sprint, without fail. Someone asks something that was already decided and we re-litigate it.",
      "At least weekly. The worst is post-vacation — come back and spend the first two days just catching up on why things changed.",
      "It's more of a chronic background noise than a weekly incident. Small decisions get lost constantly.",
    ],
    'workarounds': [
      "My team does async Loom recordings for bigger decisions — but search is terrible and nobody watches them.",
      "I tried requiring everyone to write ADRs but the team hated the overhead. We lasted two months before it fell apart.",
      "I've resigned to just being the 'memory' person on my team. Which is not scalable at all.",
    ],
    'ideal-solution': [
      "I'd want something that silently captures decisions without requiring me to change my workflow. I'm not filling out another form.",
      "Ideal world: I can search by topic and see what was decided, when, by whom, and what was considered but rejected. That 'rejected' part is crucial — that's where all the tribal knowledge lives.",
      "If it could surface 'hey, you made a related decision 4 months ago — is this consistent?' unprompted, that would be gold.",
    ],
    'skepticism': [
      "My concern is signal-to-noise. If it flags every comment as a decision, it becomes useless. I need it to be selective.",
      "How does it know what a 'decision' is versus just someone venting in a comment? That distinction seems really hard.",
      "I've seen too many AI tools that require you to babysit them. If I have to review and approve every 'detected decision,' I might as well just write it myself.",
    ],
    'adoption-willingness': [
      "I'd pilot it for one team and see if it actually reduces our re-discussion rate over a quarter. If there's measurable impact, I'd push for wider adoption.",
      "I'd need to see it handle our actual messy data first. Demo-ware is easy. Show me it works on a repo with 3 years of chaotic Slack threads.",
      "My team would adopt it if it required zero behavior change. If it adds a new step to anyone's workflow, it'll die in a week.",
    ],
    'generic': [
      "That's an interesting framing. I'd have to think about whether that maps to how our team actually works.",
      "I see what you're getting at. From my experience, the implementation details matter as much as the concept here.",
      "Hmm. I'd want to stress-test that assumption with a real scenario. In theory it makes sense, but practice is messier.",
    ],
  },

  'casual-user': {
    'workflow-current': [
      "Honestly? I mostly just search Slack when I need to find something. It's not great but it usually works well enough.",
      "I rely on whoever's been at the company longest to just know things. Not a great system, but that's how it goes.",
      "I bookmark things in my browser and forget about them. I know it's not ideal.",
    ],
    'problem-recognition': [
      "Oh yeah, I just went through this when I joined my current team. Spent the first three weeks asking 'why does this work this way?' and getting different answers from different people.",
      "It happens, but I've sort of accepted it as the cost of working on a complex system. Is it fixable?",
      "The worst is mid-PR when someone comments 'we decided not to do it this way' and you have no idea where that decision lives.",
    ],
    'frequency': [
      "Probably a few times a month? More often when something changes and I don't know why.",
      "It's sporadic. Some weeks are fine, then there's a stretch where everything feels opaque.",
      "Honestly less than some of my coworkers — I think I've just gotten used to asking people directly.",
    ],
    'workarounds': [
      "I just ask someone. Usually my tech lead. I know they're probably tired of my questions but it's the fastest path.",
      "I search GitHub comments and hope the thread explains it. Usually it doesn't.",
      "I've started keeping my own notes in Bear app — just stuff I learn that I might need later.",
    ],
    'ideal-solution': [
      "I'd love something I could just search and get a plain-English answer from. Not a thread dump — an actual summary.",
      "If there was a tool that said 'here's the 3 key decisions about this area of the codebase' when I'm reading a file, that would save me so much time.",
      "Something I don't have to maintain would be great. I always start a system and drop it in two weeks.",
    ],
    'skepticism': [
      "I worry it'd be hard to set up and then I'd forget to use it.",
      "I'd be skeptical until I saw it give a correct answer. Then I'd probably trust it too much.",
      "As long as it doesn't require me to change how I work day-to-day, I'd give it a shot.",
    ],
    'adoption-willingness': [
      "If my team adopted it, I'd definitely use it. I follow the team's tooling.",
      "I'd try it but I need a quick win early or I'll move on. I don't have patience for tools that take weeks to show value.",
      "Sure, I'd try it. I'm not precious about tools.",
    ],
    'generic': [
      "That makes sense to me. I'd probably just want to try it and see.",
      "Yeah, I hadn't thought about it that way. Interesting.",
      "Hmm. I'd need to see it in practice to have a real opinion.",
    ],
  },

  'skeptic': {
    'workflow-current': [
      "Git blame, PR descriptions, and talking to people. That's it. I've tried every documentation tool and they all die because people stop maintaining them.",
      "I read code. Code doesn't lie. Comments lie, wikis go stale, Confluence is a graveyard. The code is the truth.",
      "I have a running text file on my machine. No tools, no integrations. It's embarrassing but it's the only thing that's ever worked for me.",
    ],
    'problem-recognition': [
      "Of course context gets lost. But I don't think that's a tooling problem — it's a culture problem. If teams don't value writing good commit messages and PR descriptions, no AI will fix that.",
      "It's a real problem but I'm skeptical of solutions that don't address the root cause. People need to write things down as they make decisions.",
      "I've seen this problem blamed on tooling before. We switched to three different wikis over five years and the problem never changed because the behavior never changed.",
    ],
    'frequency': [
      "Less often than most people on my team — because I'm obsessive about leaving paper trails in code.",
      "It happens. But I usually trace it back to someone not writing a good commit message.",
      "Often enough that I've developed strong opinions about it.",
    ],
    'workarounds': [
      "I write detailed commit messages. I require the same from my team. It's the only thing that scales.",
      "ADRs — Architectural Decision Records. Stored in the repo. They don't get lost because the code can't be deployed without the repo.",
      "I just ask the person directly. AI is solving a problem that clear communication already solves.",
    ],
    'ideal-solution': [
      "If I'm being honest? A tool that makes people write better commit messages would solve 80% of this. Everything else is a band-aid.",
      "I'd want something that works on the data that actually matters — the git history — not chat messages that nobody writes carefully.",
      "I'd want full transparency into how it made its decision classification. Black-box 'AI detected this as a decision' is not acceptable.",
    ],
    'skepticism': [
      "My fundamental concern is that AI-generated summaries will be confidently wrong and people will trust them. That's worse than the original problem.",
      "I've seen LLMs hallucinate technical details in ways that are hard to spot unless you already know the answer. That's a serious risk for decision logs.",
      "Who's responsible when the AI-generated decision log is wrong and a team makes a bad choice based on it? These accountability questions never get answered.",
    ],
    'adoption-willingness': [
      "I'd need to see false positive and false negative rates on our actual codebase before I'd consider it. And I'd need that data to be open.",
      "I'm not going to block my team from trying it. But I'll be watching closely for the first time it confidently says something wrong.",
      "I'd use it as a search tool only — not as a source of truth. Maybe that's the right mental model for everyone.",
    ],
    'generic': [
      "I'd push back on that framing. The assumption seems off to me.",
      "Maybe. I've learned to be skeptical of tools that promise to solve organizational problems with software.",
      "I can see the argument. I'm not convinced, but I'm listening.",
    ],
  },

  'early-adopter': {
    'workflow-current': [
      "I've been through phases — Notion AI for notes, GitHub Copilot for code, Linear for tickets. I'm always experimenting. Right now I'm trying to use Claude to summarize weekly standups.",
      "I use a combination of Obsidian with a custom plugin, Linear, and Slack Connect. It's probably too many tools but I enjoy the tinkering.",
      "I've got an AI agent that watches our Slack channel and tags anything that looks decision-y. It's a prototype but it's actually working reasonably well.",
    ],
    'problem-recognition': [
      "This is the exact problem I've been trying to solve! I built a script that scrapes PR comments and tries to extract decisions into a Notion page. It's about 60% reliable.",
      "Yes, and I think it's getting worse as teams get more distributed. Asynchronous decision-making is the default now and there's no good tooling for it.",
      "Absolutely. I've pitched this as an internal tooling project twice. Each time it got deprioritized in favor of product work.",
    ],
    'frequency': [
      "Constantly. But I've been trying to log it so I have data. Roughly 3-4 times a week something surfaces that should have been in a decision log.",
      "It's the biggest source of friction in my team right now. I'd say we lose half a sprint every quarter to it.",
      "More than I'd like. I'm trying to build better habits but it's a team problem.",
    ],
    'workarounds': [
      "My Slack-to-Notion pipeline prototype, like I mentioned. Also I've started doing weekly 'decision digest' posts in our engineering channel.",
      "I tried a custom bot but Slack's search API is surprisingly limited. The data is there but extracting meaningful decisions from it is harder than it looks.",
      "Manually, mostly. I've accepted I need to be the discipline until there's a tool I trust.",
    ],
    'ideal-solution': [
      "Real-time classification with low latency. I want to see a 'this looks like a decision' flag while I'm still in the ticket or PR — not a weekly digest.",
      "I'd want to be able to train it on my team's specific definition of 'decision.' What counts for us might be different from another team.",
      "Integration with wherever I already work. I'm not opening another app. It needs to surface in Linear, GitHub, and Slack.",
    ],
    'skepticism': [
      "My main concern is data privacy — especially for enterprise customers. Who sees the ticket and Slack data? How is it stored?",
      "The first version will probably be too broad — flagging everything. I'd want good controls to calibrate the sensitivity.",
      "I worry it'll be too expensive. These AI-powered tools often cost 5x more than anyone budgets for.",
    ],
    'adoption-willingness': [
      "I would sign up for a beta today if you had one. Seriously.",
      "I'd pay for this personally before my company adopted it officially. I need it that much.",
      "I'd trial it for a sprint and if it caught even 50% of the decisions I care about, I'd advocate for company-wide adoption.",
    ],
    'generic': [
      "Oh that's interesting — I hadn't thought about it from that angle. Tell me more.",
      "I'd want to prototype that and see. My experience is that the edge cases are where these things live or die.",
      "Yes, and I think the opportunity is actually bigger than you're framing it.",
    ],
  },

  'non-technical': {
    'workflow-current': [
      "I take a lot of meeting notes in Google Docs. Then I send a summary in Slack. Then it all gets forgotten. I know there must be a better way.",
      "I rely on email threads for important decisions. Which I know is terrible but at least there's a searchable record.",
      "I have a Notion page I try to update but I'm the only one who uses it. Everyone else just pings me when they need to know something.",
    ],
    'problem-recognition': [
      "Oh, constantly. We have meetings where we make a decision, and two meetings later people are discussing the same thing like it never happened.",
      "The hardest part for me is when I need to explain to a new stakeholder why we made a certain choice and I can't find where that decision was made.",
      "Yes, but I assumed this was just how work works. Is this fixable?",
    ],
    'frequency': [
      "Every week. Without exception.",
      "Multiple times a week. It's one of my biggest frustrations.",
      "It's such a regular occurrence I've stopped being surprised by it.",
    ],
    'workarounds': [
      "I write very long emails summarizing our meetings. I know people don't read them but at least they're there.",
      "I've started making people repeat back decisions in meetings to make sure we're aligned. It helps in the moment but doesn't solve the long-term memory problem.",
      "I send follow-up Slack messages summarizing what was decided. About 20% of them actually get acknowledged.",
    ],
    'ideal-solution': [
      "Something that doesn't require me to do anything extra. I'm already at capacity.",
      "Plain language summaries — no jargon. I need to be able to send the output to a non-technical stakeholder and have it make sense.",
      "Something that integrates with the tools I already use. I'm not learning another system.",
    ],
    'skepticism': [
      "I'd be worried about accuracy. If it misclassifies something important as not a decision, and we miss it, that could cause real problems.",
      "How would it know which decisions matter? A lot of what we discuss isn't important. I'd want it to be smart about that.",
      "I'd need to trust it before I relied on it. That would take time.",
    ],
    'adoption-willingness': [
      "I'd try anything at this point. This problem is genuinely painful.",
      "If it didn't require changing my workflow, absolutely. If it added steps, probably not.",
      "I'd need IT to approve it and that could take months. But personally, yes.",
    ],
    'generic': [
      "That's interesting. I'd need to think about how that would work in my specific context.",
      "From my side of things, the biggest need is probably different from the engineering team's.",
      "That makes sense. I hadn't thought about it from the technical side.",
    ],
  },

  'manager': {
    'workflow-current': [
      "I do weekly team updates in Confluence and rely on 1:1s to surface things that aren't being documented. It's imperfect.",
      "I try to set expectations that every major decision gets a Jira comment with a rationale. Enforcement is the hard part.",
      "I have my own system — a shared doc I update weekly with team highlights and key decisions. My team almost never reads it, which defeats the purpose.",
    ],
    'problem-recognition': [
      "From a management perspective, this shows up as onboarding time. My last new hire took three months to be fully autonomous because so much knowledge was tribal.",
      "When people leave, the knowledge walks out with them. We've lost significant institutional memory to turnover in the past two years.",
      "It's a multiplier problem — the bigger the team, the worse it gets. We went from 5 to 20 engineers in 18 months and the communication overhead is crushing.",
    ],
    'frequency': [
      "My team probably loses 5-10% of their productive time to context re-establishment every week. I've never measured it precisely but that's my gut.",
      "Enough that I've made 'write things down' a team value. Not enough people practice it.",
      "Constant. It's the single biggest structural inefficiency in my team.",
    ],
    'workarounds': [
      "Designated knowledge owners per area. It helps but creates bottlenecks and bus factor risk.",
      "We do architecture review meetings where we formally document decisions. Overhead is high but the output is valuable.",
      "I pair new people with veterans. Good for onboarding, doesn't scale.",
    ],
    'ideal-solution': [
      "I want a tool I can point at a new hire and say 'this will tell you why we built things the way we did.' That's worth a lot.",
      "Something that generates a quarterly report of all key decisions made — so I can review what we decided and whether those decisions held up. Retroactive learning.",
      "Team-level analytics would be interesting. Which topics generate the most decision churn? That might reveal underlying alignment problems.",
    ],
    'skepticism': [
      "My concern is false confidence. If the tool gives incomplete information and people treat it as authoritative, it could lead to worse decisions.",
      "Change management is always the hard part. Even if the tool is great, getting a team to trust and use it takes months.",
      "ROI is going to be hard to measure. How do you quantify 'saved X hours of context re-establishment'?",
    ],
    'adoption-willingness': [
      "I'd pitch it to leadership as an onboarding efficiency investment. If I can show it cuts ramp time, there's a budget conversation.",
      "I'd run a team trial for a quarter and track qualitative feedback. Hard metrics would be hard to isolate.",
      "I'd need to see security compliance documentation before I could propose it internally. Our procurement process is thorough.",
    ],
    'generic': [
      "From a team health perspective, that framing resonates. I'd add that the cultural piece matters as much as the tool.",
      "That's a good point. I'd want to understand how this fits into the broader workflow before committing.",
      "As a manager, I'd be most interested in the onboarding and knowledge retention angle.",
    ],
  },

  'student': {
    'workflow-current': [
      "I take notes in Notion and try to keep a running doc for each project. I'm not super disciplined about it though.",
      "I screenshot things a lot. Terrible system but it's fast.",
      "I rely on my group chat. Someone usually remembers things.",
    ],
    'problem-recognition': [
      "Oh yes, on group projects especially. We'll have a whole discussion about a design decision and then two weeks later someone redoes it differently.",
      "Honestly, I just accept that I'll forget things. Is that bad?",
      "In my internship last summer this was a big thing — so much institutional knowledge in people's heads that nobody had written down.",
    ],
    'frequency': [
      "Pretty often on group projects. Less in solo work because it's all in my head.",
      "A few times a semester where it really costs us something.",
      "Enough that I've started keeping better notes.",
    ],
    'workarounds': [
      "Group chats and shared Google Docs. Not elegant but we manage.",
      "I rely on being the person who remembers things. My teammates rely on me too much for this.",
      "We started using Linear for our capstone project and it helped — having all the context in the issue is useful.",
    ],
    'ideal-solution': [
      "Something free or cheap — we're students, budget matters.",
      "Simple is key. If it requires setup or training, nobody will do it.",
      "I'd want it to work with GitHub since that's what all my projects are already in.",
    ],
    'skepticism': [
      "I'd worry it wouldn't work well enough to be worth the effort of integrating it.",
      "AI tools have a reputation for making stuff up. I'd be cautious about trusting it for anything important.",
      "I'd just want to see it work on a real example before I believed it.",
    ],
    'adoption-willingness': [
      "If it was free and easy to set up, absolutely.",
      "I'd try it for a class project if there was a free tier.",
      "Depends on how much my teammates were into it. I don't want to be the only one using it.",
    ],
    'generic': [
      "That's interesting, I haven't thought about it that way before.",
      "Yeah that makes sense. From a student perspective though, the bar is pretty low — anything better than Slack search.",
      "Hmm. I'd have to see it to really have an opinion.",
    ],
  },
};

const CATEGORY_KEYWORDS: Record<ResponseCategory, string[]> = {
  'workflow-current': ['workflow', 'currently', 'how do you', 'what do you use', 'day-to-day', 'routine', 'process', 'system', 'manage'],
  'problem-recognition': ['problem', 'issue', 'frustrat', 'pain', 'lose', 'lost', 'hard', 'difficult', 'challenge', 'struggle', 'happen'],
  'frequency': ['often', 'how many', 'frequency', 'how much', 'how frequently', 'times', 'how regularly'],
  'workarounds': ['workaround', 'instead', 'do you compensate', 'alternative', 'substitute', 'cope', 'manage without'],
  'ideal-solution': ['ideal', 'perfect', 'would you want', 'dream', 'if you could', 'best case', 'wish', 'should work', 'what would'],
  'skepticism': ['concern', 'worry', 'doubt', 'skeptic', 'problem with', 'risk', 'downside', 'negative', 'hesit'],
  'adoption-willingness': ['adopt', 'would you use', 'would you try', 'would you pay', 'interested', 'sign up', 'willing', 'buy', 'trial'],
  'generic': [],
};

export function detectCategory(question: string): ResponseCategory {
  const q = question.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as [ResponseCategory, string[]][]) {
    if (category === 'generic') continue;
    if (keywords.some((k) => q.includes(k))) return category;
  }
  return 'generic';
}

export function pickResponse(archetype: PersonaArchetype, category: ResponseCategory, usedResponses: Set<string>): string {
  const pool = RESPONSE_BANK[archetype]?.[category] ?? RESPONSE_BANK[archetype]['generic'];
  const available = pool.filter((r) => !usedResponses.has(r));
  const source = available.length > 0 ? available : pool;
  return source[Math.floor(Math.random() * source.length)];
}
