import type { BlockProps } from '../../../types';
import type { HeaderMenuItem } from '@/widgets/header';

import { memo } from 'react';

import { Group } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import clsx from 'clsx';

import { useIsMobile } from '@hooks/useIsMobile';

import { cmfControlAttrs, controlAttrs, resolveCmfScope } from '@/shared/lib';
import { AppActionIcon } from '@/shared/ui';
import { AppLogo, AppTooltip } from '@/shared/ui';

import { useSidebarConfig } from '../../../context';
import { useAsideMenuButtonSize, useMenuItemRenderable } from '../../../hooks';
import { itemKey, resolveItemHref, resolveLogoControlVariant } from '../../../lib';
import { useSidebarTypePack } from '../../type';

import styles from './styles.module.scss';

/** Fallback aria when item has neither `label` nor `name` but still shows an image. */
const LOGO_FALLBACK_LABEL = 'Logo';
const LOGO_TRIGGER_KEY_SUFFIX = '-trigger';
/** Cascade SoT keys — match `--cmf-*-sidebar-header-logo*` / `*-logo-trigger-*` tokens. */
const LOGO_CMF_KEY = 'logo';
const LOGO_TRIGGER_CMF_KEY = 'logo-trigger';

/** Visible / aria title — `name` only (empty allowed; AppLogo hides when no name + no img). */
function resolveLogoName(item: { name?: string }): string {
  return item.name?.trim() ?? '';
}

function LogoMark({
  label,
  img,
  className,
  onError,
}: {
  label: string;
  img?: string;
  className?: string;
  onError?: () => void;
}) {
  const hasImg = (img?.length ?? 0) > 0;
  if (hasImg) {
    return (
      <img
        className={clsx(styles.mark, className)}
        src={img}
        alt=""
        aria-hidden
        decoding="async"
        onError={onError}
      />
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
 * - trigger when `menuIcon: true` — `data-cmf-key="logo-trigger"`
 * - mark when name and/or working img — `data-cmf-key="logo"`
 * Hide mark when no img (or onError) and no name.
 */
function LogoComponent({ item, className }: BlockProps) {
  const { tooltip } = useSidebarConfig();
  const { itemKind } = useSidebarTypePack();
  const size = useAsideMenuButtonSize();
  const isMobile = useIsMobile();
  const { visible, onImgError, showItemImg } = useMenuItemRenderable(item);
  const isCompact = itemKind === 'actionIcon';
  /** Burger opens chrome elsewhere on ≤ tablet; drawer close lives in SidebarHeader. */
  const showTrigger = item.menuIcon === true && !isMobile;

  if (!showTrigger && !visible) return null;

  const href = resolveItemHref(item.url);
  const name = resolveLogoName(item);
  const ariaLabel = name.length > 0 ? name : LOGO_FALLBACK_LABEL;
  const variant = resolveLogoControlVariant(item);
  const triggerItem = resolveTriggerItem(item);
  const triggerAttrs = {
    ...controlAttrs(
      triggerItem,
      resolveCmfScope(triggerItem, {
        widget: 'sidebar',
        chrome: 'header',
        key: LOGO_TRIGGER_CMF_KEY,
      }),
    ),
    disabled: false,
  };
  const logoAttrs = {
    ...controlAttrs(
      item,
      resolveCmfScope(item, { widget: 'sidebar', chrome: 'header', key: LOGO_CMF_KEY }),
    ),
    disabled: false,
  };

  const trigger = showTrigger && (
    <AppActionIcon
      name={triggerItem.name}
      className={className}
      variant={variant}
      size={size}
      aria-label={triggerItem.name}
      {...triggerAttrs}
    >
      <IconMenu2 stroke={1.75} aria-hidden className="cmf-ActionIcon-icon-svg" />
    </AppActionIcon>
  );

  const logo = !visible ? null : isCompact ? (
    <AppActionIcon
      name={item.name}
      img={showItemImg ? item.img : undefined}
      href={href}
      variant={variant}
      size={size}
      aria-label={ariaLabel}
      {...logoAttrs}
    >
      <LogoMark
        label={ariaLabel}
        img={showItemImg ? item.img : undefined}
        className="cmf-ActionIcon-icon-svg"
        onError={onImgError}
      />
    </AppActionIcon>
  ) : (
    <AppLogo href={href} label={name} img={item.img} variant={variant} {...logoAttrs} />
  );

  const logoNode =
    logo !== null && isCompact ? (
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
    );

  return (
    <Group
      className={clsx(styles.root, className)}
      {...cmfControlAttrs({ component: 'sidebar-header', key: LOGO_CMF_KEY })}
    >
      {trigger}
      {logoNode}
    </Group>
  );
}

export const Logo = memo(LogoComponent);
Logo.displayName = 'SidebarLogo';
