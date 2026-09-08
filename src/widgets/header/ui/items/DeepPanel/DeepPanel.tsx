import type { HeaderDeepPanelGroup } from '../../../lib';
import type { MenuProps } from '@mantine/core';

import { Fragment, memo, useMemo } from 'react';

import { Menu } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';

import { getMenuDefaultProps, mergeOverlayDefaultProps } from '@/shared/config';
import { AppActionIcon } from '@/shared/ui';

import { useConfig } from '../../../context';
import { HEADER_DROPDOWN_CMF_COMPONENT } from '../../../lib';
import { HEADER_TABLER_ICON_PROPS } from '../icons/iconProps';
import { DeepPanelItem } from './DeepPanelItem';

import styles from '../../../styles/items/DeepPanel.module.scss';

type DeepPanelProps = {
  groups: readonly HeaderDeepPanelGroup[];
};

/** Product defaults for DeepPanel — settings (`params.menu` / `header.menu`) win over these. */
const DEEP_PANEL_MENU_DEFAULTS = {
  withinPortal: false,
  position: 'bottom-end',
  offset: 4,
  loop: false,
  trapFocus: false,
} as const satisfies Partial<MenuProps>;

function DeepPanelComponent({ groups }: DeepPanelProps) {
  const { menu: headerMenu } = useConfig();

  const menuProps = useMemo(
    () =>
      mergeOverlayDefaultProps(
        mergeOverlayDefaultProps(
          DEEP_PANEL_MENU_DEFAULTS as Record<string, unknown>,
          getMenuDefaultProps() as Record<string, unknown>,
        ),
        (headerMenu ?? {}) as Record<string, unknown>,
      ),
    [headerMenu],
  );

  if (groups.length === 0) return null;

  return (
    <Menu {...menuProps}>
      <Menu.Target>
        <AppActionIcon
          className={styles.trigger}
          variant="transparent"
          size="md"
          native
          aria-label="Open menu"
          data-cmf-component={HEADER_DROPDOWN_CMF_COMPONENT}
          data-cmf-key="trigger"
        >
          <IconMenu2 {...HEADER_TABLER_ICON_PROPS} aria-hidden />
        </AppActionIcon>
      </Menu.Target>
      <Menu.Dropdown className={styles.dropdown} data-cmf-component={HEADER_DROPDOWN_CMF_COMPONENT}>
        <div className={styles.scroll}>
          {groups.map((group) => (
            <Fragment key={group.key}>
              {group.label.length > 0 && (
                <Menu.Label className={styles.label}>{group.label}</Menu.Label>
              )}
              {group.items.map((item) => (
                <DeepPanelItem key={item.key} item={item} />
              ))}
            </Fragment>
          ))}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}

export const DeepPanel = memo(DeepPanelComponent);
DeepPanel.displayName = 'DeepPanel';
