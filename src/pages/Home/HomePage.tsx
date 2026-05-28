import { memo } from 'react';

import { Link } from 'react-router-dom';

function HomePageComponent() {
  return (
    <main>
      <h1>Home</h1>
      <p>Минимальная сборка: прокси + авторизация + bootstrap.</p>
      <nav style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <Link to="/auth">Sign in</Link>
        <Link to="/register">Register</Link>
      </nav>
    </main>
  );
}

export const HomePage = memo(HomePageComponent);
HomePage.displayName = 'HomePage';
