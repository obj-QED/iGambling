import type { AppTooltipProps } from './types/props.types';
import type { CSSProperties } from 'react';

import { isValidElement, memo } from 'react';

import { Tooltip } from '@mantine/core';

import { resolveAppTooltipLabel, resolveTooltipConfig } from '@/shared/lib/tooltip';

import styles from './styles.module.scss';

/** Resolve place tokens into `--tooltip-bg|color|radius` (key → component → shared). */
function buildTooltipCascadeStyle(
  cmfComponent: string | undefined,
  cmfKey: string | undefined,
): CSSProperties | undefined {
  if (!cmfComponent) return undefined;

  const componentBg = `var(--tooltip-${cmfComponent}-bg, var(--mantine-color-dark-3))`;
  const componentColor = `var(--tooltip-${cmfComponent}-color, var(--mantine-color-white))`;
  const componentRadius = `var(--tooltip-${cmfComponent}-radius, var(--mantine-radius-default))`;

  if (!cmfKey) {
    return {
      ['--tooltip-bg' as string]: componentBg,
      ['--tooltip-color' as string]: componentColor,
      ['--tooltip-radius' as string]: componentRadius,
    };
  }

  return {
    ['--tooltip-bg' as string]: `var(--tooltip-${cmfComponent}-${cmfKey}-bg, ${componentBg})`,
    ['--tooltip-color' as string]: `var(--tooltip-${cmfComponent}-${cmfKey}-color, ${componentColor})`,
    ['--tooltip-radius' as string]: `var(--tooltip-${cmfComponent}-${cmfKey}-radius, ${componentRadius})`,
  };
}

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

  return (
    <Tooltip
      label={tooltipLabel}
      position={resolved.position}
      openDelay={resolved.delay}
      withArrow={resolved.withArrow}
      offset={resolved.offset}
      className={className}
      classNames={{ tooltip: styles.tooltip }}
      styles={{ tooltip: buildTooltipCascadeStyle(cmfComponent, cmfKey) }}
      {...(cmfComponent && { 'data-cmf-component': cmfComponent })}
      {...(cmfKey && { 'data-cmf-key': cmfKey })}
    >
      <span className={styles.target}>{children}</span>
    </Tooltip>
  );
}

export const AppTooltip = memo(AppTooltipComponent);
AppTooltip.displayName = 'AppTooltip';
