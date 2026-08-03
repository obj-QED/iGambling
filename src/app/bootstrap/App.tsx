import { ErrorBoundary } from '@/app/ErrorBoundary';

import { AppBootstrap } from './AppBootstrap';

export function App() {
  return (
    <ErrorBoundary>
      <AppBootstrap />
    </ErrorBoundary>
  );
}

App.displayName = 'App';
