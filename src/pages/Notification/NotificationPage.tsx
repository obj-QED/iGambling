import { memo } from 'react';

function NotificationPageComponent() {
  return (
    <main>
      <h1>Notifications</h1>
      <p>Notifications for signed-in users.</p>
    </main>
  );
}

export const NotificationPage = memo(NotificationPageComponent);
NotificationPage.displayName = 'NotificationPage';
