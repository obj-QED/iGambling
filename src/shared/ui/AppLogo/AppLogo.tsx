import type { AppLogoProps } from './types';

import { memo, useState } from 'react';

import clsx from 'clsx';

import { AppButton } from '@/elements';

import styles from './styles.module.scss';

function AppLogoComponent({
  label,
  href,
  img,
  className,
  variant = 'transparent',
  ...buttonProps
}: AppLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const alt = label.trim();
  const hasImg = (img?.length ?? 0) > 0;

  if (alt.length === 0 && !hasImg) return null;

  if (!hasImg) {
    return (
      <AppButton
        href={href}
        label={alt}
        variant={variant}
        className={clsx(styles.textLogo, className)}
        aria-label={alt}
        {...buttonProps}
      />
    );
  }

  if (imgFailed) return null;

  return (
    <AppButton
      href={href}
      variant={variant}
      className={clsx(styles.root, className)}
      aria-label={alt.length > 0 ? alt : undefined}
      leftSection={
        <img
          className={clsx(styles.image, 'cmf-Button-image')}
          src={img}
          alt={alt}
          loading="eager"
          decoding="async"
          onError={() => {
            setImgFailed(true);
          }}
        />
      }
      {...buttonProps}
    />
  );
}

export const AppLogo = memo(AppLogoComponent);
AppLogo.displayName = 'AppLogo';
