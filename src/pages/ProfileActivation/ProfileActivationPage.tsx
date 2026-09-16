import { memo, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const REDIRECT_SECONDS = 5;

function ProfileActivationPageComponent() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    const timeoutId = window.setTimeout(() => {
      navigate('/signIn', { replace: true });
    }, REDIRECT_SECONDS * 1000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <main>
      <h1>Profile activated</h1>
      <p>
        Redirecting to sign in in {secondsLeft} second{secondsLeft === 1 ? '' : 's'}…
      </p>
    </main>
  );
}

export const ProfileActivationPage = memo(ProfileActivationPageComponent);
ProfileActivationPage.displayName = 'ProfileActivationPage';
export default ProfileActivationPage;
