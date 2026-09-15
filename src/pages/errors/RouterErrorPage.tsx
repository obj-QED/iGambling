import { memo } from 'react';

import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { ServerErrorPage } from './ServerErrorPage';

function RouterErrorPageComponent() {
  const error = useRouteError();
  const detail = import.meta.env.DEV
    ? isRouteErrorResponse(error)
      ? `${error.status} ${error.statusText}`
      : error instanceof Error
        ? error.message
        : undefined
    : undefined;

  return <ServerErrorPage detail={detail} />;
}

export const RouterErrorPage = memo(RouterErrorPageComponent);
RouterErrorPage.displayName = 'RouterErrorPage';
