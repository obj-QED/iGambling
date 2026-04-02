import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const REDIRECT_TIMEOUT_MS = 5000;

export function ProfileActivationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, REDIRECT_TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main>
      <h1>Профиль активирован</h1>
      <p>Перенаправляем на главную через 5 секунд...</p>
    </main>
  );
}

ProfileActivationPage.displayName = 'ProfileActivationPage';
