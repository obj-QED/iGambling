import type { AppTooltipProps } from './types/props.types';

import { isValidElement, memo } from 'react';

import { Tooltip } from '@mantine/core';

import { resolveAppTooltipLabel, resolveTooltipConfig } from '@/shared/lib/tooltip';

import styles from './styles.module.scss';

function AppTooltipComponent({
  label,
  name,
  children,
  config,
  override,
  cmfComponent,
  cmfKey,
  className,
}: AppTooltipProps) {
  const resolved = resolveTooltipConfig(config, override);
  const tooltipLabel = resolveAppTooltipLabel(label, name);

  if (!resolved.enabled || tooltipLabel === undefined || !isValidElement(children)) {
    return children;
  }

  const { delay, position, withArrow, offset, closeDelay, ...mantineRest } = { ...resolved };
  Reflect.deleteProperty(mantineRest, 'enabled');
  Reflect.deleteProperty(mantineRest, 'openDelay');

  return (
    <Tooltip
      {...mantineRest}
      label={tooltipLabel}
      position={position}
      openDelay={delay}
      closeDelay={closeDelay}
      withArrow={withArrow}
      offset={offset}
      className={className}
      classNames={{ tooltip: styles.tooltip }}
      {...(cmfComponent && { 'data-cmf-component': cmfComponent })}
      {...(cmfKey && { 'data-cmf-key': cmfKey })}
    >
      <span className={styles.target}>{children}</span>
    </Tooltip>
  );
}

export const AppTooltip = memo(AppTooltipComponent);
AppTooltip.displayName = 'AppTooltip';
