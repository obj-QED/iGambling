import type { RootProps } from '../../types';

import { memo, useMemo } from 'react';

import { Group } from '@mantine/core';

import { splitHeaderDropdownMenu } from '../../lib';
import { resolveHeaderLayout } from '../../registry';
import { DeepPanel } from '../items/DeepPanel/DeepPanel';
import { Section } from '../Section';
import { Shell } from '../Shell';

import styles from '../../styles/base/Shell.module.scss';
import dropdownStyles from '../../styles/type/DropdownType.module.scss';

/**
 * `dropdown` type: full header on desktop; on mobile (≤ tablet) only specials
 * (logo, search, wallet, notification, color_scheme, …) stay in the bar —
 * remaining items go into DeepPanel grouped by section label.
 */
function DropdownTypeStrategyComponent({ menu, config }: RootProps) {
  const Layout = resolveHeaderLayout(config.layout);
  const { outsideMenu, dropdownGroups } = useMemo(() => splitHeaderDropdownMenu(menu), [menu]);
  const outsideSections = outsideMenu.sections.filter((section) => section.items.length > 0);

  return (
    <>
      <div className={dropdownStyles.desktop} data-header-dropdown-mode="desktop">
        <Shell menu={menu} config={config} />
      </div>

      <div className={dropdownStyles.mobile} data-header-dropdown-mode="mobile">
        <Layout>
          <Group className={styles.sections} data-header-type="dropdown" unstyled>
            <Group className={dropdownStyles.outside} gap="sm" wrap="wrap" unstyled>
              {outsideSections.map((section) => (
                <Section key={section.key} section={section} />
              ))}
            </Group>
            <DeepPanel groups={dropdownGroups} />
          </Group>
        </Layout>
      </div>
    </>
  );
}

export const DropdownTypeStrategy = memo(DropdownTypeStrategyComponent);
DropdownTypeStrategy.displayName = 'DropdownTypeStrategy';
