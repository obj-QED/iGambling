import type { CmfActiveLineProps } from './types';

import { memo } from 'react';

import clsx from 'clsx';

import styles from './styles.module.scss';

/**
 * Real DOM active edge bar (not `::after`).
 * Must render **inside** the control that owns `--button-active-*` / `--ai-active-*`
 * so CMF cascade vars inherit. Position comes from inset/width/height tokens
 * (`bottom` → full-width bar, `left` → full-height bar, etc.).
 */
export const CmfActiveLine = memo(function CmfActiveLine({
  control = 'button',
  className,
}: CmfActiveLineProps) {
  return (
    <span
      className={clsx(
        styles.root,
        control === 'ai' ? styles.ai : styles.button,
        className,
        'cmf-Button-activeLine',
      )}
      data-cmf-active-line=""
      data-cmf-active-control={control}
      aria-hidden
    />
  );
});

CmfActiveLine.displayName = 'CmfActiveLine';
