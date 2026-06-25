import { memo, useCallback, useState } from 'react';

import clsx from 'clsx';

import styles from '../../../styles/menu/ItemIcon.module.scss';

type ItemIconProps = {
  src: string;
  alt: string;
  className?: string;
  onError?: () => void;
};

function ItemIconComponent({ src, alt, className, onError }: ItemIconProps) {
  const [hidden, setHidden] = useState(false);

  const handleError = useCallback(() => {
    setHidden(true);
    onError?.();
  }, [onError]);

  return (
    <img
      className={clsx(styles.root, hidden && styles.hidden, className)}
      src={src}
      alt={alt}
      onError={handleError}
    />
  );
}

export const ItemIcon = memo(ItemIconComponent);
ItemIcon.displayName = 'ItemIcon';
