import type { AppBannerProps } from '../types';

import { memo } from 'react';

import clsx from 'clsx';

import { isCapabilityEnabled } from '@/shared/schema';

import styles from './AppBanner.module.scss';

function AppBannerComponent({ banner, schema, className }: AppBannerProps) {
  if (!isCapabilityEnabled(schema.capabilities, 'banner')) return null;
  if (banner.slides.length === 0) return null;

  return (
    <section
      className={clsx(styles.root, className)}
      data-widget="banner"
      data-layout={schema.layout}
      data-variant={schema.variant}
      data-autoplay={schema.behavior.autoplay ? 'true' : undefined}
      aria-label="Banner"
    >
      {/* Banner content renders here in Phase 2+ */}
    </section>
  );
}

export const AppBanner = memo(AppBannerComponent);
AppBanner.displayName = 'AppBanner';
