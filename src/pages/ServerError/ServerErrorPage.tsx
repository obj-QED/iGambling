import { memo, useCallback } from 'react';

import { navigateAppHref } from '@/shared/lib/routing';

export type ServerErrorPageProps = {
  /** Dev-only detail (e.g. bootstrap failure reason). */
  detail?: string;
};

function ServerErrorPageComponent({ detail }: ServerErrorPageProps) {
  // SPA navigate without RR `<Link>` — this page also mounts outside RouterProvider.
  const onSignInClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    navigateAppHref('/auth');
  }, []);

  return (
    <main>
      <h1>500</h1>
      <p>Server error. Please try again later.</p>
      {detail != null && detail.length > 0 && (
        <pre
          style={{
            marginTop: '1rem',
            textAlign: 'left',
            overflow: 'auto',
            maxWidth: '48rem',
            padding: '1rem',
            background: 'var(--color-bg-body, #f5f5f5)',
            borderRadius: '8px',
            fontSize: '0.875rem',
          }}
        >
          {detail}
        </pre>
      )}
      <a href="/auth" onClick={onSignInClick}>
        Sign in
      </a>
    </main>
  );
}

export const ServerErrorPage = memo(ServerErrorPageComponent);
ServerErrorPage.displayName = 'ServerErrorPage';
