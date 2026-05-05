import { memo } from 'react';

function RegisterPageComponent() {
  return (
    <main>
      <h1>Register</h1>
      <p>Registration page. Full app access comes after you create an account.</p>
    </main>
  );
}

export const RegisterPage = memo(RegisterPageComponent);
RegisterPage.displayName = 'RegisterPage';
