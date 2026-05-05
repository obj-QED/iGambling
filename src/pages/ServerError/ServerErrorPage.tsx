import { memo } from 'react';

import { AppLink } from '@/shared/ui';

function ServerErrorPageComponent() {
  return (
    <main>
      <h1>500</h1>
      <p>Server error. Please try again later.</p>
      <AppLink href="/">Home</AppLink>
    </main>
  );
}

export const ServerErrorPage = memo(ServerErrorPageComponent);
ServerErrorPage.displayName = 'ServerErrorPage';
