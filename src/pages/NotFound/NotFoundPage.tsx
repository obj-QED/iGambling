import { memo } from 'react';

import { Link } from 'react-router-dom';

function NotFoundPageComponent() {
  return (
    <main>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/auth">Sign in</Link>
    </main>
  );
}

export const NotFoundPage = memo(NotFoundPageComponent);
NotFoundPage.displayName = 'NotFoundPage';
