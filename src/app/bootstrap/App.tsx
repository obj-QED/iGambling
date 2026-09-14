import { ErrorBoundary } from '@pages/eager';

import { AppBootstrap } from './AppBootstrap';
import { InvalidResponseGate } from './InvalidResponseGate';

export function App() {
  return (
    <ErrorBoundary>
      <InvalidResponseGate>
        <AppBootstrap />
      </InvalidResponseGate>
    </ErrorBoundary>
  );
}

App.displayName = 'App';
