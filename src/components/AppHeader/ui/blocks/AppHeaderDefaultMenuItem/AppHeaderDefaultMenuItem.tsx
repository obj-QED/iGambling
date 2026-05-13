import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

import { memo } from 'react';

import ReactInlineSvg from 'react-inlinesvg';

import { Button } from '@ui';

type AppHeaderDefaultMenuItemProps = {
  item: AppHeaderMenuItem;
};

function resolveDefaultMenuItemIcon(item: AppHeaderMenuItem) {
  const imageUrl = item.img?.trim();

  if (!imageUrl) {
    return undefined;
  }

  if (imageUrl.toLowerCase().endsWith('.svg')) {
    return <ReactInlineSvg src={imageUrl} aria-hidden />;
  }

  return imageUrl;
}

function AppHeaderDefaultMenuItemComponent({ item }: AppHeaderDefaultMenuItemProps) {
  const label = item.name?.trim() || item.key || 'menu-item';
  const url = item.url?.trim() ?? '';
  const icon = resolveDefaultMenuItemIcon(item);

  return (
    <Button
      url={url}
      aria-label={label}
      varsKey="header-btn-login"
      icon={icon}
    >
      {label}
    </Button>
  );
}

export const AppHeaderDefaultMenuItem = memo(AppHeaderDefaultMenuItemComponent);
AppHeaderDefaultMenuItem.displayName = 'AppHeaderDefaultMenuItem';
