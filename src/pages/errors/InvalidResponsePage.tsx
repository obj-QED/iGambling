import { memo, useCallback } from 'react';

import { navigateAppHref } from '@/shared/lib/routing';

export type InvalidResponsePageProps = {
  status: number;
  message: string;
  snippet?: string;
};

function InvalidResponsePageComponent({ status, message, snippet }: InvalidResponsePageProps) {
  const onSignInClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    navigateAppHref('/signIn');
  }, []);

  const body = snippet != null && snippet.length > 0 ? `${message}\n\n${snippet}` : message;

  return (
    <main>
      <h1>{status}</h1>
      <p>Invalid server response.</p>
      <pre
        role="alert"
        style={{
          marginTop: '1rem',
          textAlign: 'left',
          overflow: 'auto',
          maxWidth: '48rem',
          padding: '1rem',
          background: 'var(--color-bg-body, #f5f5f5)',
          borderRadius: '8px',
          fontSize: '0.875rem',
          whiteSpace: 'pre-wrap',
        }}
      >
        {body}
      </pre>
      <a href="/signIn" onClick={onSignInClick}>
        Sign in
      </a>
    </main>
  );
}

export const InvalidResponsePage = memo(InvalidResponsePageComponent);
InvalidResponsePage.displayName = 'InvalidResponsePage';
export default InvalidResponsePage;
