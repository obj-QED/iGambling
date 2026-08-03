import { memo, useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const REDIRECT_TIMEOUT_MS = 5000;

function ProfileActivationPageComponent() {
  const navigate = useNavigate();

  const redirectToAuth = useCallback(() => {
    navigate('/auth', { replace: true });
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(redirectToAuth, REDIRECT_TIMEOUT_MS);
    return () => { clearTimeout(timer); };
  }, [redirectToAuth]);

  return (
    <main>
      <h1>Profile activated</h1>
      <p>Redirecting to sign in in 5 seconds…</p>
    </main>
  );
}

export const ProfileActivationPage = memo(ProfileActivationPageComponent);
ProfileActivationPage.displayName = 'ProfileActivationPage';
