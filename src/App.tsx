import { AppProvider } from './store/AppContext';
import { useAppContext } from './hooks/useAppContext';
import { SetupPage } from './pages/SetupPage';
import { PersonaSelectPage } from './pages/PersonaSelectPage';
import { InterviewPage } from './pages/InterviewPage';
import { SummaryPage } from './pages/SummaryPage';
import { MockProvider } from './providers/MockProvider';
import { ClaudeProvider } from './providers/ClaudeProvider';
import { createServices } from './services';

function buildProvider() {
  const key = localStorage.getItem('pil_api_key');
  if (key) return new ClaudeProvider(key);
  return new MockProvider();
}
const provider = buildProvider();
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
