import { memo } from 'react';

function ProfilePageComponent() {
  return (
    <main>
      <h1>Profile</h1>
      <p>This page is available to signed-in users only.</p>
    </main>
  );
}

export const ProfilePage = memo(ProfilePageComponent);
ProfilePage.displayName = 'ProfilePage';
