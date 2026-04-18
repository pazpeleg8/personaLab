# PersonaLab

A persona interview simulation tool for product researchers. Prepare for user interviews by simulating conversations with AI-generated personas — refine your questions, surface hypothesis signals, and generate a repeatable interview playbook.

## What it does

1. **Context setup** — describe your product, problem, solution, and hypothesis
2. **Persona selection** — get 3–5 relevant AI-generated personas and pick one to interview
3. **Simulated interview** — conduct a conversation, ask suggested or custom questions, tag each question (good / neutral / problematic + reason)
4. **Summary** — automatic interview summary, hypothesis signals (for/against), notable quotes, question quality review, and an interview playbook for future sessions

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Use the **Load demo scenario** button to instantly populate a realistic example (Linear Companion — AI decision logs for engineering teams).

## Enabling Claude AI

The app ships with a mock provider. To switch to real Claude responses:

1. Add your Anthropic API key to `.env.local`:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-...
   ```
2. In `src/App.tsx`, swap the provider:
   ```typescript
   import { ClaudeProvider } from './providers/ClaudeProvider';
   const provider = new ClaudeProvider(import.meta.env.VITE_ANTHROPIC_API_KEY);
   ```
3. Implement the methods in `src/providers/ClaudeProvider.ts` using the prompt templates in `src/providers/prompts.ts`

## Architecture

```
src/
  types/          # All domain models (TypeScript interfaces)
  providers/      # AIProvider interface + MockProvider + ClaudeProvider stub
  services/       # Thin service classes wrapping the provider
  store/          # React Context + useReducer for global state
  hooks/          # useAppContext, useInterview, useAsyncAction
  data/           # Demo scenario + mock response bank
  pages/          # SetupPage, PersonaSelectPage, InterviewPage, SummaryPage
  components/     # Modular UI components by domain
  utils/          # cn, storage, formatters
```

**Switching from mock to Claude requires changing exactly one line in `App.tsx`.**

## Sessions

Sessions are persisted to `localStorage` (key prefix `pil_`). Reloading the page restores your last session. Use **Start new interview** on the summary page to clear state.

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS v3
- No external state management library
- No routing library (4 pages controlled by state)
