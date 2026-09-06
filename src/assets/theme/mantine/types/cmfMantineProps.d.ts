import '@mantine/core';

/**
 * Extra Mantine prop bridges (not CMF scope).
 * CMF scope is DOM-only: `data-cmf-component` | `data-cmf-key` | `data-cmf-role`
 * via `cmfControlAttrs` / spread — no camelCase props.
 */
declare module '@mantine/core' {
  export interface ButtonProps {
    /** CMF layout: stretch control to container width (menu rows, sidebar). */
    fullscreen?: boolean;
  }
}
