import type { ReactNode } from 'react';
import { ProgressBar } from './ProgressBar';
import type { AppState } from '../../store/AppContext';

interface Props {
  currentPage: AppState['currentPage'];
  children: ReactNode;
}

export function AppShell({ currentPage, children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="font-semibold text-gray-900">PersonaLab</span>
          </div>
          <ProgressBar currentPage={currentPage} />
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
