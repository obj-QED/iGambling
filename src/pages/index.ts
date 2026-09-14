import { lazy } from 'react';

export const HomePage = lazy(() => import('./Home/HomePage'));

export const LoginPage = lazy(() => import('./Login/LoginPage'));

export const RegisterPage = lazy(() => import('./Register/RegisterPage'));

export const NotFoundPage = lazy(() => import('./errors/NotFoundPage'));

export const ServerErrorPage = lazy(() => import('./errors/ServerErrorPage'));

export const ProfileActivationPage = lazy(
  () => import('./ProfileActivation/ProfileActivationPage'),
);
