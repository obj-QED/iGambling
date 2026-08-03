import { memo } from 'react';

import { Link } from 'react-router-dom';

function ServerErrorPageComponent() {
  return (
    <main>
      <h1>500</h1>
      <p>Server error. Please try again later.</p>
      <Link to="/auth">Sign in</Link>
    </main>
  );
}

export const ServerErrorPage = memo(ServerErrorPageComponent);
ServerErrorPage.displayName = 'ServerErrorPage';
