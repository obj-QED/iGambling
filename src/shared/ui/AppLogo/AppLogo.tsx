import type { AppLogoProps } from './types';
import type { ReactNode } from 'react';

import { memo, useState } from 'react';

import clsx from 'clsx';
import SVG from 'react-inlinesvg';

import { AppButton } from '@/elements';
import { isSvgMediaSrc } from '@/shared/lib/cmfIcon';

import styles from './styles.module.scss';

function AppLogoMedia({
  img,
  alt,
  onError,
}: {
  img: string;
  alt: string;
  onError: () => void;
}): ReactNode {
  const mediaClassName = clsx(styles.image, 'cmf-Button-image');

  if (isSvgMediaSrc(img) === true) {
    return (
      <span className={mediaClassName} role="img" aria-label={alt.length > 0 ? alt : undefined}>
        <SVG src={img} data-src={img} className={styles.svg} onError={onError} aria-hidden />
      </span>
    );
  }

  return (
    <img
      className={mediaClassName}
      src={img}
      alt={alt}
      loading="eager"
      decoding="async"
      onError={onError}
    />
  );
}

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
  const hasName = alt.length > 0;
  const hasImg = (img?.length ?? 0) > 0 && !imgFailed;

  // No usable img (missing or onError) and no name → do not render.
  if (!hasImg && !hasName) return null;

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

  return (
    <AppButton
      href={href}
      variant={variant}
      className={clsx(styles.root, className)}
      aria-label={hasName ? alt : undefined}
      leftSection={
        <AppLogoMedia
          img={img!}
          alt={alt}
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
