import { memo } from 'react';

function NotificationPageComponent() {
  return (
    <main>
      <h1>Уведомления</h1>
      <p>Раздел уведомлений для авторизованного пользователя.</p>
    </main>
  );
}

export const NotificationPage = memo(NotificationPageComponent);
NotificationPage.displayName = 'NotificationPage';
