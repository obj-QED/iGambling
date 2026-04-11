import { memo } from 'react';

function LoginPageComponent() {
  return (
    <main>
      <h1>Вход</h1>
      <p>Страница входа. Доступ к приложению — после авторизации.</p>
    </main>
  );
}

export const LoginPage = memo(LoginPageComponent);
LoginPage.displayName = 'LoginPage';
