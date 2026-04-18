import type { ReactNode } from 'react';
import { ProgressBar } from './ProgressBar';
import type { AppState } from '../../store/AppContext';

interface Props {
  currentPage: AppState['currentPage'];
  children: ReactNode;
  fullHeight?: boolean;
}

export function AppShell({ currentPage, children, fullHeight }: Props) {
  return (
    <div className={fullHeight ? 'h-screen flex flex-col bg-gray-50' : 'min-h-screen bg-gray-50'}>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shrink-0">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#4f46e5"/>
              <circle cx="16" cy="11" r="4" fill="white" opacity="0.95"/>
              <path d="M8 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.95"/>
              <circle cx="23" cy="9" r="3.5" fill="#a5b4fc"/>
              <circle cx="23" cy="9" r="1.5" fill="#4f46e5"/>
            </svg>
            <span className="font-semibold text-gray-900 tracking-tight">PersonaLab</span>
          </div>
          <ProgressBar currentPage={currentPage} />
        </div>
      </header>
      <main className={fullHeight ? 'flex-1 min-h-0 max-w-5xl w-full mx-auto px-6' : 'max-w-5xl mx-auto px-6 py-8'}>
        {children}
      </main>
    </div>
  );
}
