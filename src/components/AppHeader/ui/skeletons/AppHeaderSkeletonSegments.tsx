import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

import { memo } from 'react';

import { Skeleton } from '@mantine/core';

import { getAppHeaderSectionItems } from '@AppHeader/lib/menuItems';

type AppHeaderSkeletonSegmentsProps = {
  menu?: AppHeaderMenuItem[];
  layoutClassName: string;
  sectionClassName: string;
  className: string;
};

const DEFAULT_SKELETON_MENU: AppHeaderMenuItem[] = [
  {
    url: '#',
    name: 'block1',
    key: 'block1',
    img: '',
    items: [
      { url: '', name: 'sign_up', key: 'sign_up', img: '' },
      { url: '', name: 'sign_in', key: 'sign_in', img: '' },
    ],
  },
  {
    url: '#',
    name: 'block2',
    key: 'block2',
    img: '',
    items: [
      { url: '', name: 'casino', key: 'casino', img: '' },
      { url: '', name: 'slots', key: 'slots', img: '' },
    ],
  },
  {
    url: '#',
    name: 'block3',
    key: 'block3',
    img: '',
    items: [
      { url: '', name: 'search', key: 'search', img: '' },
      { url: '', name: 'wallet', key: 'wallet', img: '' },
    ],
  },
];

function resolveSkeletonWidth(item: AppHeaderMenuItem): number {
  if (item.key === 'logo') {
    return 32;
  }

  if (item.key === 'wallet') {
    return 36;
  }

  const label = item.name?.trim() || item.key || 'item';
  const hasLeadVisual = item.key === 'search' || Boolean(item.img?.trim());

  return Math.max(56, Math.min(140, label.length * 8 + (hasLeadVisual ? 48 : 24)));
}

function resolveSkeletonHeight(item: AppHeaderMenuItem): number {
  return item.key === 'logo' ? 28 : 36;
}

function resolveSkeletonRadius(item: AppHeaderMenuItem): number {
  return item.key === 'logo' ? 8 : 6;
}

function AppHeaderSkeletonSegmentsComponent({
  menu,
  layoutClassName,
  sectionClassName,
  className,
}: AppHeaderSkeletonSegmentsProps) {
  const sections = Array.isArray(menu) && menu.length > 0 ? menu : DEFAULT_SKELETON_MENU;

  return (
    <div className={layoutClassName}>
      {sections.map((section) => (
        <div
          key={section.key}
          className={sectionClassName}
          data-testid="app-header-skeleton-section"
        >
          {getAppHeaderSectionItems(section).map((item) => (
            <Skeleton
              key={item.key}
              animate
              className={className}
              data-testid="app-header-skeleton-item"
              height={resolveSkeletonHeight(item)}
              radius={resolveSkeletonRadius(item)}
              width={resolveSkeletonWidth(item)}
              styles={{
                root: {
                  flexShrink: 0,
                  backgroundColor: 'var(--app-header-skeleton-mantine-fill, rgb(255 255 255 / 22%))',
                },
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export const AppHeaderSkeletonSegments = memo(AppHeaderSkeletonSegmentsComponent);
AppHeaderSkeletonSegments.displayName = 'AppHeaderSkeletonSegments';
