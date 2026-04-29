import { lazy } from 'react';

export const HomePage = lazy(() =>
  import('./Home/HomePage').then((m) => ({ default: m.HomePage }))
);

export const LoginPage = lazy(() =>
  import('./Login/LoginPage').then((m) => ({ default: m.LoginPage }))
);

export const RegisterPage = lazy(() =>
  import('./Register/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);

export const ProfilePage = lazy(() =>
  import('./Profile/ProfilePage').then((m) => ({ default: m.ProfilePage }))
);

export const NotificationPage = lazy(() =>
  import('./Notification/NotificationPage').then((m) => ({ default: m.NotificationPage }))
);

export const NotFoundPage = lazy(() =>
  import('./NotFound/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

export const ServerErrorPage = lazy(() =>
  import('./ServerError/ServerErrorPage').then((m) => ({ default: m.ServerErrorPage }))
);

export const ProfileActivationPage = lazy(() =>
  import('./ProfileActivation/ProfileActivationPage').then((m) => ({
    default: m.ProfileActivationPage,
  }))
);
