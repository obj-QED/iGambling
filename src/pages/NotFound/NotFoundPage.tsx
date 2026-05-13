import { memo } from 'react';

import { AppLink } from '@ui';

function NotFoundPageComponent() {
  return (
    <main>
      <h1>404</h1>
      <p>Page not found.</p>
      <AppLink href="/">Home</AppLink>
    </main>
  );
}

export const NotFoundPage = memo(NotFoundPageComponent);
NotFoundPage.displayName = 'NotFoundPage';
