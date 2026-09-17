import type { BlockProps } from '../../../types';
import type { ReactNode } from 'react';

import { memo, useMemo } from 'react';

import { Badge } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';

import { useMediaState } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { AppButton } from '@/shared/ui';

import { useAsideMenuButtonSize } from '../../../hooks';
import { resolveItemHref, resolveItemLabel, resolveMenuItemButtonVariant } from '../../../lib';
import { ItemMedia } from '../../items/ItemMedia/ItemMedia';

import styles from '../../../styles/blocks/SidebarHeader.module.scss';
import itemStyles from '../../../styles/items/ItemButton.module.scss';

function hasAccountSubtitle(subtitle: string | undefined): subtitle is string {
  return subtitle !== undefined && subtitle.length > 0;
}

/** On `.cmf-Button-section` (slot) — same sizing contract as menu ItemButton. */
const CMF_BUTTON_SECTION_ICON = 'cmf-Button-section-icon';
const CMF_BUTTON_ICON = 'cmf-Button-icon';

export type SidebarHeaderLinkProps = BlockProps & {
  /**
   * Extra left chrome (e.g. slideout rail glyph). Composed *with* ItemMedia —
   * never replaces it, so SVG/img stay mounted across expand/collapse.
   */
  leftSection?: ReactNode;
  /** When true with `leftSection`, park ItemMedia (keep mounted, hide). */
  parkItemMedia?: boolean;
  /** Collapsed slideout rail — drop account chevron / badge. */
  hideRightSection?: boolean;
  /** Collapsed slideout rail — icon-only (hide label flex, center mark). */
  railIconOnly?: boolean;
};

/** Default-type header row. Compact overrides via typePack.HeaderLink. */
function SidebarHeaderLinkComponent({
  item,
  leftSection: leftSectionExtra,
  parkItemMedia = false,
  hideRightSection = false,
  railIconOnly = false,
}: SidebarHeaderLinkProps) {
  const { onImgError, showItemImg } = useMediaState(item);
  const size = useAsideMenuButtonSize();
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);

  const subtitle = item.subtitle;
  const badge = item.badge;
  const isAccountProfile = hasAccountSubtitle(subtitle);

  const leftSection = useMemo(() => {
    const media = showItemImg && (
      <ItemMedia
        item={item}
        alt={label}
        onImgError={onImgError}
        className={clsx(
          CMF_BUTTON_ICON,
          isAccountProfile ? styles.mainLinkAvatar : styles.mainLinkIcon,
          parkItemMedia && leftSectionExtra !== undefined && itemStyles.mediaParked,
        )}
      />
    );

    if (media !== null && leftSectionExtra !== undefined) {
      return (
        <>
          {media}
          {leftSectionExtra}
        </>
      );
    }

    return media ?? leftSectionExtra ?? undefined;
  }, [showItemImg, item, label, onImgError, isAccountProfile, parkItemMedia, leftSectionExtra]);

  const labelContent = railIconOnly ? (
    // Keep accessible name; visual label collapsed via `[data-sidebar-header-rail]`.
    label
  ) : isAccountProfile ? (
    <div className={styles.mainLinkText}>
      <span className={styles.mainLinkTitle}>{label}</span>
      <span className={styles.mainLinkSubtitle}>{subtitle}</span>
    </div>
  ) : (
    label
  );

  const rightSection =
    hideRightSection || railIconOnly ? undefined : isAccountProfile ? (
      <IconChevronRight className={styles.mainLinkChevron} size={16} stroke={1.5} aria-hidden />
    ) : badge !== undefined && String(badge).length > 0 ? (
      <Badge size="sm" variant="filled" className={styles.mainLinkBadge}>
        {badge}
      </Badge>
    ) : undefined;

  return (
    <AppButton
      href={href}
      label={labelContent}
      aria-label={railIconOnly ? label : undefined}
      variant={resolveMenuItemButtonVariant(item)}
      size={size}
      fullscreen
      justify={hideRightSection || railIconOnly ? 'center' : 'space-between'}
      className={styles.mainLink}
      leftSection={leftSection}
      rightSection={rightSection}
      sectionClassNames={{
        left: leftSection !== undefined ? CMF_BUTTON_SECTION_ICON : undefined,
      }}
      active={item.active}
      matchRoute={item.matchRoute}
      activeMatch={item.activeMatch}
      {...(railIconOnly ? { 'data-sidebar-header-rail': true } : {})}
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'sidebar', chrome: 'header' }))}
    />
  );
}

export const SidebarHeaderLink = memo(SidebarHeaderLinkComponent);
SidebarHeaderLink.displayName = 'SidebarHeaderLink';
