import { memo } from 'react';

function ProfilePageComponent() {
  return (
    <main>
      <h1>Профиль</h1>
      <p>Страница доступна только авторизованным пользователям.</p>
    </main>
  );
}

export const ProfilePage = memo(ProfilePageComponent);
ProfilePage.displayName = 'ProfilePage';
