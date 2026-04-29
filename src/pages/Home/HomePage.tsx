
import type { CSSProperties } from 'react';

import { memo } from 'react';

import { Button } from '@mantine/core';

import { MantineButtonsProvider } from '@/shared/ui';

import styles from './HomePage.module.scss';

const BUTTON_VARIANTS = ['default', 'filled', 'light', 'outline', 'subtle', 'transparent', 'white'] as const;


type ButtonCssVars = CSSProperties & {
  [key: `--button-${string}`]: string;
};
const testButtonVars: ButtonCssVars = {
  '--button-bg': 'var(--my-btn-bg)',
  '--button-color': 'var(--my-btn-color)',
  '--button-bd': 'var(--my-btn-border, none)',
  '--button-radius': '10px',
  '--button-fz': '10px',
  '--button-padding-x': '10px',

  '--button-hover': 'var(--my-btn-hover)',
  '--button-hover-color': 'var(--my-btn-hover-color, var(--my-btn-color))',
  // Active state
  '--button-active-bg': 'var(--my-btn-active-bg, gray)',
  '--button-active-color': 'var(--my-btn-active-color, white)',
  '--button-active-border': 'var(--my-btn-active-border, var(--my-btn-border))',
  // Disabled state
  '--button-disabled-bg': 'var(--my-btn-disabled-bg, gray)',
  '--button-disabled-color': 'var(--my-btn-disabled-color, #9ca3af)',
  '--button-disabled-border': 'var(--my-btn-disabled-border, gray)',

  '--button-size': 'sm'

};

function HomePageComponent() {
  return (
    <section className={styles.root}>
      <MantineButtonsProvider>
        <div className={styles.block}>
          <h2 className={styles.title}>Mantine Button variants (default)</h2>
          <div className={styles.row}>
            {BUTTON_VARIANTS.map((variant) => (
              <Button key={variant} variant={variant} size="sm">
                {variant}
              </Button>
            ))}
          </div>
        </div>
        <div className={`${styles.block} ${styles.blockDark}`}>
          <h2 className={styles.title}>Same variants with custom CSS variables</h2>
          <div className={styles.row}>
            <Button variant="transparent" size={testButtonVars['--button-size']} className={styles.customButton} style={testButtonVars}
            >
              Test Default Button
            </Button>
          </div>
        </div>
      </MantineButtonsProvider>
    </section>
  );
}

export const HomePage = memo(HomePageComponent);
HomePage.displayName = 'HomePage';
