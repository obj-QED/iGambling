import type { BlockProps } from '../../../types';
import type { HeaderMenuItem } from '@/widgets/header';

import { memo } from 'react';

import { Group } from '@mantine/core';
import { IconArticle } from '@tabler/icons-react';
import clsx from 'clsx';

import { AppActionIcon } from '@/elements';
import { AppLogo, AppTooltip } from '@/shared/ui';

import { useSidebarConfig } from '../../../context';
import { useAsideMenuButtonSize } from '../../../hooks';
import {
  itemKey,
  menuItemDataAttrs,
  resolveItemHref,
  resolveLogoControlVariant,
} from '../../../lib';
import { useSidebarTypePack } from '../../../typePacks';

import styles from './styles.module.scss';

/** Fallback for AppLogo / aria when item has neither `label` nor `name`. */
const LOGO_FALLBACK_LABEL = 'Logo';
const LOGO_TRIGGER_KEY_SUFFIX = '-trigger';
/** Cascade SoT keys — match `--cmf-*-sidebar-logo*` / `--cmf-*-sidebar-logo-trigger-*` tokens. */
const LOGO_CMF_KEY = 'logo';
const LOGO_TRIGGER_CMF_KEY = 'logo-trigger';

/** Visible / aria title — `name` only. `label` is tooltip HTML (AppTooltip). */
function resolveLogoLabel(item: { label?: string; name?: string }): string {
  const fromName = item.name?.trim() ?? '';
  if (fromName.length > 0) return fromName;
  return LOGO_FALLBACK_LABEL;
}

function LogoMark({ label, img, className }: { label: string; img?: string; className?: string }) {
  const hasImg = (img?.length ?? 0) > 0;
  if (hasImg) {
    return (
      <img className={clsx(styles.mark, className)} src={img} alt="" aria-hidden decoding="async" />
    );
  }
  return <span className={clsx(styles.markText, className)}>{label}</span>;
}

function resolveTriggerItem(item: HeaderMenuItem): HeaderMenuItem {
  const baseKey = itemKey(item) || LOGO_CMF_KEY;
  return {
    ...item,
    key: `${baseKey}${LOGO_TRIGGER_KEY_SUFFIX}`,
    name: item.name?.trim() || 'Menu',
  };
}

/**
 * Two controls:
 * - `data-key` = item key / `{item.key}-trigger` (identity)
 * - `data-cmf-key` = `logo` / `logo-trigger` (token cascade — not the API key)
 */
function LogoComponent({ item, className }: BlockProps) {
  const { tooltip } = useSidebarConfig();
  const { itemKind } = useSidebarTypePack();
  const size = useAsideMenuButtonSize();
  const isCompact = itemKind === 'actionIcon';

  const href = resolveItemHref(item.url);
  const label = resolveLogoLabel(item);
  const variant = resolveLogoControlVariant(item);
  const triggerItem = resolveTriggerItem(item);
  const triggerAttrs = {
    ...menuItemDataAttrs(triggerItem),
    'data-cmf-key': LOGO_TRIGGER_CMF_KEY,
    disabled: false,
  };
  const logoAttrs = {
    ...menuItemDataAttrs(item),
    'data-cmf-key': LOGO_CMF_KEY,
    disabled: false,
  };

  const trigger = (
    <AppActionIcon
      name={triggerItem.name}
      className={className}
      variant={variant}
      size={size}
      aria-label={triggerItem.name}
      {...triggerAttrs}
    >
      <IconArticle stroke={1} aria-hidden className="cmf-ActionIcon-icon-svg" />
    </AppActionIcon>
  );

  const logo = isCompact ? (
    <AppActionIcon
      name={item.name}
      img={item.img}
      href={href}
      variant={variant}
      size={size}
      aria-label={label}
      {...logoAttrs}
    >
      <LogoMark label={label} img={item.img} className="cmf-ActionIcon-icon-svg" />
    </AppActionIcon>
  ) : (
    <AppLogo href={href} label={label} img={item.img} variant={variant} {...logoAttrs} />
  );

  return (
    <Group gap="sm" className={className} justify={isCompact ? 'center' : 'flex-start'}>
      {trigger}
      {isCompact ? (
        <AppTooltip
          label={item.label}
          name={item.name}
          config={tooltip}
          cmfComponent="sidebar"
          cmfKey={LOGO_CMF_KEY}
        >
          {logo}
        </AppTooltip>
      ) : (
        logo
      )}
    </Group>
  );
}

export const Logo = memo(LogoComponent);
Logo.displayName = 'SidebarLogo';
