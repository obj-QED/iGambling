import type { SectionProps } from '../../../types';
import type { ReactNode } from 'react';

import { memo } from 'react';

import { Group } from '@mantine/core';
import clsx from 'clsx';

import { cmfControlAttrs, isNonEmptyArray } from '@/shared/lib';

import { filterRenderableItems } from '../../../lib';
import { Block } from '../../Block';
import { useSidebarTypePack } from '../../type';
import { SidebarFooterLink } from './FooterLink';

import styles from '../../../styles/blocks/SidebarFooter.module.scss';

const FOOTER_CMF_COMPONENT = 'sidebar-footer';

function FooterRow({
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
      {...cmfControlAttrs({ component: FOOTER_CMF_COMPONENT, key: cascadeKey })}
    >
      {children}
    </Group>
  );
}

/**
 * Footer region — chrome links only.
 * Main-menu specials are not routed here (Section → Block owns them).
 * Each item is a CMF-scoped Group row (same contract as SidebarHeader).
 */
function SidebarFooterComponent({ section }: SectionProps) {
  const { FooterLink } = useSidebarTypePack();
  const PackLink = FooterLink ?? SidebarFooterLink;
  const items = filterRenderableItems(section.items);
  if (items.length === 0) return null;

  return (
    <div className={styles.root} data-sidebar-region="footer">
      {items.map((item) => {
        const rowKey = item.key ?? item.name;
        const cascadeKey = item.key ?? String(rowKey ?? 'row');

        if (isNonEmptyArray(item.items)) {
          return (
            <FooterRow key={rowKey} cascadeKey={cascadeKey}>
              <Block item={item} />
            </FooterRow>
          );
        }

        return (
          <FooterRow key={rowKey} cascadeKey={cascadeKey}>
            <PackLink item={item} />
          </FooterRow>
        );
      })}
    </div>
  );
}

export { SidebarFooterLink } from './FooterLink';
export const SidebarFooter = memo(SidebarFooterComponent);
SidebarFooter.displayName = 'SidebarFooter';
