import { AppProvider } from './store/AppContext';
import { useAppContext } from './hooks/useAppContext';
import { SetupPage } from './pages/SetupPage';
import { PersonaSelectPage } from './pages/PersonaSelectPage';
import { InterviewPage } from './pages/InterviewPage';
import { SummaryPage } from './pages/SummaryPage';
import { MockProvider } from './providers/MockProvider';
import { createServices } from './services';

// To use Claude: replace MockProvider with ClaudeProvider from './providers/ClaudeProvider'
// and pass import.meta.env.VITE_ANTHROPIC_API_KEY to its constructor.
const provider = new MockProvider();
const services = createServices(provider);

function Router() {
  const { state } = useAppContext();
  switch (state.currentPage) {
    case 'setup': return <SetupPage />;
    case 'persona-select': return <PersonaSelectPage />;
    case 'interview': return <InterviewPage />;
    case 'summary': return <SummaryPage />;
    default: return <SetupPage />;
  }
}

export default function App() {
  return (
    <AppProvider services={services}>
      <Router />
    </AppProvider>
  );
}
