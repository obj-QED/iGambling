import type { AppTooltipProps } from './types/props.types';

import { isValidElement, memo, useCallback, useEffect, useRef, useState } from 'react';

import { Tooltip } from '@mantine/core';

import { resolveAppTooltipLabel, resolveTooltipConfig } from '@/shared/lib/tooltip';

import styles from './styles.module.scss';

function isScrollContainer(el: HTMLElement): boolean {
  const { overflow, overflowX, overflowY } = getComputedStyle(el);
  return /(auto|scroll|overlay)/.test(`${overflow}${overflowX}${overflowY}`);
}

/**
 * Portal tooltips keep screen coords while ScrollArea content moves.
 * Close on ancestor scroll; re-open only after the next pointer enter.
 */
function useCloseTooltipOnAncestorScroll(enabled: boolean) {
  const targetRef = useRef<HTMLSpanElement>(null);
  const [scrollClosed, setScrollClosed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const node = targetRef.current;
    if (node === null) return;

    const parents: EventTarget[] = [window];
    let el: HTMLElement | null = node.parentElement;
    while (el !== null) {
      if (isScrollContainer(el)) parents.push(el);
      el = el.parentElement;
    }

    const onScroll = () => {
      setScrollClosed(true);
    };
    for (const parent of parents) {
      parent.addEventListener('scroll', onScroll, { passive: true, capture: true });
    }
    return () => {
      for (const parent of parents) {
        parent.removeEventListener('scroll', onScroll, true);
      }
    };
  }, [enabled]);

  const onPointerEnter = useCallback(() => {
    setScrollClosed(false);
  }, []);

  return { targetRef, scrollClosed, onPointerEnter };
}

function AppTooltipComponent({
  label,
  name,
  children,
  config,
  override,
  className,
  'data-cmf-component': dataCmfComponent,
  'data-cmf-key': dataCmfKey,
  'data-cmf-role': dataCmfRole,
}: AppTooltipProps) {
  const resolved = resolveTooltipConfig(config, override);
  const tooltipLabel = resolveAppTooltipLabel(label, name);
  const active = resolved.enabled && tooltipLabel !== undefined && isValidElement(children);
  const { targetRef, scrollClosed, onPointerEnter } = useCloseTooltipOnAncestorScroll(active);

  if (!active) {
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
      disabled={scrollClosed}
      className={className}
      classNames={{ tooltip: styles.tooltip }}
      {...(dataCmfComponent ? { 'data-cmf-component': dataCmfComponent } : {})}
      {...(dataCmfKey ? { 'data-cmf-key': dataCmfKey } : {})}
      {...(dataCmfRole ? { 'data-cmf-role': dataCmfRole } : {})}
    >
      <span ref={targetRef} className={styles.target} onPointerEnter={onPointerEnter}>
        {children}
      </span>
    </Tooltip>
  );
}

export const AppTooltip = memo(AppTooltipComponent);
AppTooltip.displayName = 'AppTooltip';
