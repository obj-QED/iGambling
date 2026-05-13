import type { AppMenuProps } from '../types/AppMenu.types';

import { Menu } from '@mantine/core';

/**
 * Thin alias over Mantine {@link https://mantine.dev/core/menu/ Menu} — no default `styles` / `classNames` / token merge.
 * Style via Mantine theme or pass `styles` / `classNames` / `vars` as for `Menu`.
 */
function AppMenuRoot(props: AppMenuProps) {
  return <Menu {...props} />;
}

AppMenuRoot.displayName = 'AppMenu';

export const AppMenu = Object.assign(AppMenuRoot, {
  Target: Menu.Target,
  Dropdown: Menu.Dropdown,
  Item: Menu.Item,
  Divider: Menu.Divider,
  Label: Menu.Label,
  Sub: Menu.Sub,
});
