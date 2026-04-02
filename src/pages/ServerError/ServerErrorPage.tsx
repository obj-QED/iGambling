import { Link } from 'react-router-dom';

export function ServerErrorPage() {
  return (
    <main>
      <h1>500</h1>
      <p>Ошибка сервера. Попробуйте позже.</p>
      <Link to="/">На главную</Link>
    </main>
  );
}

ServerErrorPage.displayName = 'ServerErrorPage';
