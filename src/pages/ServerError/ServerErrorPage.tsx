import { memo } from 'react';

import { Link } from 'react-router-dom';

function ServerErrorPageComponent() {
  return (
    <main>
      <h1>500</h1>
      <p>Ошибка сервера. Попробуйте позже.</p>
      <Link to="/">На главную</Link>
    </main>
  );
}

export const ServerErrorPage = memo(ServerErrorPageComponent);
ServerErrorPage.displayName = 'ServerErrorPage';
