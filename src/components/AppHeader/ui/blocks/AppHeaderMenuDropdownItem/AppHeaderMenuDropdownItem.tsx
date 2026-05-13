import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

import { memo, useMemo } from 'react';

import { IconChevronDown } from '@tabler/icons-react';
import ReactInlineSvg from 'react-inlinesvg';

import { AppLink, AppMenu, Button } from '@ui';

import { isNavigableMenuHref } from '@AppHeader/lib/menuHref';

type AppHeaderMenuDropdownItemProps = {
  item: AppHeaderMenuItem;
};

function resolveMenuRowIcon(item: AppHeaderMenuItem) {
  const imageUrl = item.img?.trim();
  if (!imageUrl) return undefined;
  if (imageUrl.toLowerCase().endsWith('.svg')) {
    return <ReactInlineSvg src={imageUrl} aria-hidden />;
  }
  return <img src={imageUrl} alt="" width={16} height={16} />;
}

type AppHeaderMenuDropdownChildRowProps = {
  child: AppHeaderMenuItem;
};

function AppHeaderMenuDropdownChildRowComponent({ child }: AppHeaderMenuDropdownChildRowProps) {
  const label = child.name?.trim() || child.key;
  const href = child.url?.trim() ?? '';

  if (!isNavigableMenuHref(child.url)) {
    return (
      <AppMenu.Item
        component="button"
        type="button"
        disabled
        aria-disabled
        data-invalid-href
        leftSection={resolveMenuRowIcon(child)}
      >
        {label}
      </AppMenu.Item>
    );
  }

  return (
    <AppMenu.Item component={AppLink} href={href} leftSection={resolveMenuRowIcon(child)}>
      {label}
    </AppMenu.Item>
  );
}

const AppHeaderMenuDropdownChildRow = memo(AppHeaderMenuDropdownChildRowComponent);
AppHeaderMenuDropdownChildRow.displayName = 'AppHeaderMenuDropdownChildRow';

function AppHeaderMenuDropdownItemComponent({ item }: AppHeaderMenuDropdownItemProps) {
  const children = useMemo(
    () => (Array.isArray(item.items) ? item.items.filter((c): c is AppHeaderMenuItem => c != null) : []),
    [item.items],
  );
  const label = item.name?.trim() || item.key || 'menu';
  const parentIcon = resolveMenuRowIcon(item);

  const triggerSections = useMemo(() => {
    const chevron = <IconChevronDown size="0.9em" aria-hidden />;
    if (parentIcon) {
      return { leftSection: parentIcon, rightSection: chevron };
    }
    return { rightSection: chevron };
  }, [parentIcon]);

  if (children.length === 0) {
    return null;
  }

  return (
    <AppMenu withinPortal={false}>
      <AppMenu.Target>
        <Button
          aria-label={label}
          aria-haspopup="menu"
          varsKey="header-btn-login"
          {...triggerSections}
        >
          {label}
        </Button>
      </AppMenu.Target>
      <AppMenu.Dropdown>
        {children.map((child, index) => (
          <AppHeaderMenuDropdownChildRow key={`${child.key}-${index}`} child={child} />
        ))}
      </AppMenu.Dropdown>
    </AppMenu>
  );
}

export const AppHeaderMenuDropdownItem = memo(AppHeaderMenuDropdownItemComponent);
AppHeaderMenuDropdownItem.displayName = 'AppHeaderMenuDropdownItem';
