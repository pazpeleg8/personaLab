# PersonaLab — CLAUDE.md

## What this project is

A persona interview simulation tool for product researchers. Users describe a product/problem/hypothesis, get AI-generated personas, conduct a simulated interview, tag question quality, and receive a structured summary + reusable interview playbook.

Live at: **https://pazpeleg8.github.io/personaLab/**
Repo: **https://github.com/pazpeleg8/personaLab**

---

## Current status (2026-04-19)

### Done
- Full 4-page flow: Setup → Persona Select → Interview → Summary
- Mock provider fully implemented (response bank: 7 archetypes × 8 categories × 3–6 responses)
- Demo scenario built in (Linear Companion — load via "Load demo scenario" button)
- Question tagging: good / neutral / problematic + 7 reason types
- Summary page: stats bar, hypothesis signals, notable quotes, question quality table, next steps, playbook
- Interview playbook export as `.md` file
- localStorage persistence (key prefix `pil_`, schema version 1)
- GitHub Pages deploy via Actions on push to `main` (source: GitHub Actions, not branch)
- ClaudeProvider stub ready with prompt templates in `src/providers/prompts.ts`

### Not yet done
- ClaudeProvider not implemented (all methods throw — scaffold only)
- No real LLM integration yet (mock only)
- No export for full summary (only playbook exports)
- No multi-session history / session list
- No way to find real users to interview (planned future feature)
- Mobile layout not optimized (interview page uses fixed-width sidebar)

---

## Tech stack

- **Vite + React 18 + TypeScript** — `npm run dev`, `npm run build`
- **Tailwind CSS v3** — color system uses `indigo` as primary accent
- **localStorage** — persists session across reloads, clears on "Start new interview"
- **No router** — navigation is `state.currentPage` dispatched through AppContext
- **No Redux/Zustand** — React Context + useReducer only

---

## Architecture

```
src/
  types/          # All domain models — edit these first before adding features
  providers/
    AIProvider.ts      # Interface every feature depends on
    MockProvider.ts    # Full implementation — largest file
    ClaudeProvider.ts  # Stub — implement this to go live with real AI
    prompts.ts         # Prompt templates for Claude (ready to use)
  services/       # Thin wrappers around provider methods
  store/
    AppContext.tsx  # Global state — AppState interface defined here
    actions.ts     # AppAction union type
    reducer.ts     # Pure reducer
  hooks/
    useInterview.ts  # Core interview logic: sendQuestion, tagMessage, endInterview
  data/
    demoScenario.ts   # 4 rich personas for the Linear Companion demo
    mockResponses.ts  # Response bank + detectCategory() + pickResponse()
  pages/          # One file per page — keep thin, delegate to hooks/services
  components/     # Grouped by domain: layout/, setup/, personas/, interview/, summary/
  utils/
    storage.ts         # localStorage helpers with version check
    exportPlaybook.ts  # Markdown export utility
```

### Switching from mock to Claude (one line)

In `src/App.tsx`:
```typescript
// Change this:
const provider = new MockProvider();
// To this:
const provider = new ClaudeProvider(import.meta.env.VITE_ANTHROPIC_API_KEY);
```
Add `VITE_ANTHROPIC_API_KEY=sk-ant-...` to `.env.local`.
Then implement the 5 methods in `src/providers/ClaudeProvider.ts`.

---

## Common bugs & lessons learned

### Build fails with `TS1294: erasableSyntaxOnly`
TypeScript config has `erasableSyntaxOnly: true`, which **disallows constructor parameter properties** (`constructor(private foo: Bar)`).

**Fix:** always expand them explicitly:
```typescript
// ❌ broken
constructor(private provider: AIProvider) {}

// ✅ correct
private provider: AIProvider;
constructor(provider: AIProvider) { this.provider = provider; }
```
Affects all service files in `src/services/`.

### Unused imports cause build failure
`tsc -b` (used in `npm run build`) is stricter than `tsc --noEmit`. An import declared but not used directly in the file will error even if it's re-exported from a dependency.

**Example that broke:** `MockProvider.ts` imported `RESPONSE_BANK` but only used `detectCategory` and `pickResponse` (which internally use `RESPONSE_BANK`). Remove the import.

### GitHub Pages deploy fails if source is not set to "GitHub Actions"
The workflow uses `actions/configure-pages` which requires the repo's Pages source to be **GitHub Actions** (not "Deploy from a branch"). Setting it to branch deployment causes `configure-pages` to fail silently with no useful error message.

**Fix:** Repo Settings → Pages → Build and deployment → Source → **GitHub Actions**.

### Vite base path required for GitHub Pages
Without `base: '/personaLab/'` in `vite.config.ts`, all assets 404 on GitHub Pages because the app is served at a sub-path, not root.

### `npm create vite` is interactive and can't be piped
Running `npm create vite@latest .` in the project directory will cancel if the directory is not empty or if it can't detect a TTY. Scaffold into a temp path instead, then copy files over.

### localStorage rehydration must happen at reducer init time
Rehydrating state inside `useEffect` causes a flash of blank/wrong state on load. Pass the rehydration function as the third argument to `useReducer` (the initializer) so it runs synchronously before first render.

### `SummaryCard` wrapper was removed in the summary page redesign
The summary components (`HypothesisSummary`, `NotableQuotes`, `QuestionQualityTable`, `PlaybookSection`) no longer use `SummaryCard` as a wrapper — each owns its own container. `SummaryCard` still exists and is used for the executive summary and next steps blocks. Don't re-add it to the others.

### Interview page uses `fullHeight` prop on AppShell
The interview page needs a true full-height layout (no scroll on the outer page, inner chat scrolls). `AppShell` accepts `fullHeight?: boolean` which switches from `min-h-screen` to `h-screen flex flex-col`. Only use it on the interview page.

---

## Key files to read before making changes

| File | Why |
|------|-----|
| `src/types/index.ts` | All domain models — understand these before touching anything |
| `src/store/AppContext.tsx` | AppState shape, persistence wiring |
| `src/providers/MockProvider.ts` | How mock responses work — touch this to improve response quality |
| `src/data/mockResponses.ts` | Response bank — add archetypes/categories here |
| `src/hooks/useInterview.ts` | Core interview state machine |
| `src/pages/InterviewPage.tsx` | Most complex page — layout is fullHeight, two-column |

---

## Planned next features (discussed with user)

1. **Real Claude integration** — implement `ClaudeProvider.ts` using `@anthropic-ai/sdk`
2. **Find real users** — after the simulated interview, suggest ways to recruit real people matching the persona profile
3. **Full summary export** — export the entire summary (not just playbook) as PDF or Markdown
4. **Session history** — list of past interviews, ability to revisit
5. **Mobile layout** — the interview page sidebar doesn't work well on small screens
