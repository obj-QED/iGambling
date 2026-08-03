import type { HeaderMenuItem } from '../../types';
import type { ReactElement } from 'react';

import { memo } from 'react';

import { AppTooltip } from '@/shared/ui';

import { useConfig } from '../../context';

export type HeaderActionIconTooltipProps = {
  item: HeaderMenuItem;
  children: ReactElement;
};

/**
 * Tooltip for header ActionIcon controls (specials / icon-only rows).
 * Gate: `header.tooltip.enabled` + label|name — decided at the control render, not in Block.
 */
function HeaderActionIconTooltipComponent({ item, children }: HeaderActionIconTooltipProps) {
  const { tooltip } = useConfig();

  return (
    <AppTooltip
      label={item.label}
      name={item.name}
      config={tooltip}
      cmfComponent="header"
      cmfKey={item.key}
    >
      {children}
    </AppTooltip>
  );
}

export const HeaderActionIconTooltip = memo(HeaderActionIconTooltipComponent);
HeaderActionIconTooltip.displayName = 'HeaderActionIconTooltip';
