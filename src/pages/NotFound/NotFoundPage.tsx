import { memo } from 'react';

import { AppLink } from '@/shared/ui';

function NotFoundPageComponent() {
  return (
    <main>
      <h1>404</h1>
      <p>Page not found.</p>
      <AppLink href="/auth">Sign in</AppLink>
    </main>
  );
}

export const NotFoundPage = memo(NotFoundPageComponent);
NotFoundPage.displayName = 'NotFoundPage';
export default NotFoundPage;
