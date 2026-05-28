import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@/app/ErrorBoundary';

import { AppBootstrap } from './AppBootstrap';

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppBootstrap />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

App.displayName = 'App';
