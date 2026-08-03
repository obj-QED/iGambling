import type { AppBannerProps } from '../types';

import { memo } from 'react';

import clsx from 'clsx';

import styles from './AppBanner.module.scss';

function AppBannerComponent({ banner, className }: AppBannerProps) {
  if (banner.slides.length === 0) return null;

  return (
    <section className={clsx(styles.root, className)} data-widget="banner" aria-label="Banner">
      {/* Banner content renders here in Phase 2+ */}
    </section>
  );
}

export const AppBanner = memo(AppBannerComponent);
AppBanner.displayName = 'AppBanner';
