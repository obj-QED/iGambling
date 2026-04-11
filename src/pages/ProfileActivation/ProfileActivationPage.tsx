import { memo, useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const REDIRECT_TIMEOUT_MS = 5000;

function ProfileActivationPageComponent() {
  const navigate = useNavigate();

  const redirectHome = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(redirectHome, REDIRECT_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [redirectHome]);

  return (
    <main>
      <h1>Профиль активирован</h1>
      <p>Перенаправляем на главную через 5 секунд...</p>
    </main>
  );
}

export const ProfileActivationPage = memo(ProfileActivationPageComponent);
ProfileActivationPage.displayName = 'ProfileActivationPage';
