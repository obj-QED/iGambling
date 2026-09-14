import { ErrorBoundary } from '@pages/eager';

import { AppBootstrap } from './AppBootstrap';

export function App() {
  return (
    <ErrorBoundary>
      <AppBootstrap />
    </ErrorBoundary>
  );
}

App.displayName = 'App';
