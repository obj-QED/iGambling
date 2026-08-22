import { memo } from 'react';

function LoginPageComponent() {
  return (
    <main>
      <h1>Sign in</h1>
      <p>Sign-in page. Full app access comes after authentication.</p>
    </main>
  );
}

export const LoginPage = memo(LoginPageComponent);
LoginPage.displayName = 'LoginPage';
export default LoginPage;
