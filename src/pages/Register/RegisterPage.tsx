import { memo } from 'react';

function RegisterPageComponent() {
  return (
    <main>
      <h1>Регистрация</h1>
      <p>Страница регистрации. Доступ к приложению — после создания аккаунта.</p>
    </main>
  );
}

export const RegisterPage = memo(RegisterPageComponent);
RegisterPage.displayName = 'RegisterPage';
