import type { SectionProps } from '../../../types';
import type { ReactNode } from 'react';

import { memo } from 'react';

import { Group } from '@mantine/core';
import { IconXFilled } from '@tabler/icons-react';
import clsx from 'clsx';

import { useIsMobile } from '@hooks/useIsMobile';

import { cmfControlAttrs } from '@/shared/lib';
import { AppActionIcon, useAppDrawerContext } from '@/shared/ui';

import { useSidebarConfig } from '../../../context';
import { filterRenderableItems, isSpecialBlockKey } from '../../../lib';
import { Block } from '../../Block';
import { useSidebarTypePack } from '../../type';
import { SidebarHeaderLink } from './HeaderLink';

import styles from '../../../styles/blocks/SidebarHeader.module.scss';

const HEADER_CMF_COMPONENT = 'sidebar-header';
const LOGO_ITEM_KEY = 'aside_header_logo';
const LOGO_CMF_KEY = 'logo';

function HeaderRow({
  cascadeKey,
  className,
  children,
}: {
  cascadeKey: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Group
      className={clsx(styles.row, className)}
      {...cmfControlAttrs({ component: HEADER_CMF_COMPONENT, key: cascadeKey })}
    >
      {children}
    </Group>
  );
}

/**
 * Header region — chrome links; specials from `schema.specialBlockKeys` → Block.
 * Typical: `aside_header_logo` via customBlocks. Main specials stay in Section → Block.
 * Mobile/tablet (drawer chrome): close control; logo-trigger is hidden in Logo.
 * Every chrome strip is a CMF-scoped Group row (`styles.row` + group tokens).
 */
function SidebarHeaderComponent({ section }: SectionProps) {
  const { HeaderLink } = useSidebarTypePack();
  const { specialBlockKeys } = useSidebarConfig();
  const PackLink = HeaderLink ?? SidebarHeaderLink;
  const isMobile = useIsMobile();
  const { close } = useAppDrawerContext();
  const items = filterRenderableItems(section.items);
  if (items.length === 0 && !isMobile) return null;

  return (
    <div className={styles.root} data-sidebar-region="header">
      {isMobile && (
        <HeaderRow cascadeKey="drawer-close">
          <AppActionIcon
            variant="transparent"
            aria-label="Close"
            onClick={close}
            data-cmf-component={HEADER_CMF_COMPONENT}
            data-cmf-key="drawer-close"
          >
            <IconXFilled aria-hidden className="cmf-ActionIcon-icon-svg" />
          </AppActionIcon>
        </HeaderRow>
      )}

      {items.map((item) => {
        const rowKey = item.key ?? item.name;
        const cascadeKey =
          item.key === LOGO_ITEM_KEY ? LOGO_CMF_KEY : (item.key ?? String(rowKey ?? 'row'));

        if (item.items !== undefined && item.items.length > 0) {
          return (
            <HeaderRow key={rowKey} cascadeKey={cascadeKey}>
              <Block item={item} />
            </HeaderRow>
          );
        }

        if (isSpecialBlockKey(item.key, specialBlockKeys)) {
          return (
            <HeaderRow key={rowKey} cascadeKey={cascadeKey}>
              <Block item={item} />
            </HeaderRow>
          );
        }

        return (
          <HeaderRow key={rowKey} cascadeKey={cascadeKey}>
            <PackLink item={item} />
          </HeaderRow>
        );
      })}
    </div>
  );
}

export { SidebarHeaderLink } from './HeaderLink';
export const SidebarHeader = memo(SidebarHeaderComponent);
SidebarHeader.displayName = 'SidebarHeader';
