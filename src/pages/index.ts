import { lazy } from 'react';

export const HomePage = lazy(() => import('./Home/HomePage'));

export const LoginPage = lazy(() => import('./Login/LoginPage'));

export const RegisterPage = lazy(() => import('./Register/RegisterPage'));

export const NotFoundPage = lazy(() => import('./NotFound/NotFoundPage'));

export const ServerErrorPage = lazy(() => import('./ServerError/ServerErrorPage'));

export const ProfileActivationPage = lazy(
  () => import('./ProfileActivation/ProfileActivationPage'),
);
