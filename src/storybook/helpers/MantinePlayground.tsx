import type { ReactNode } from 'react';

type MantinePlaygroundProps = {
  children: ReactNode;
};

/** Centers a single component like Mantine docs Usage demos. */
export function MantinePlayground({ children }: MantinePlaygroundProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'min(40vh, 320px)',
        width: '100%',
        padding: 'var(--spacing-md, 1rem)',
      }}
    >
      {children}
    </div>
  );
}
