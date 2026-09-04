import type { AppButtonProps, AppButtonSectionClassNames } from '../types';

import { forwardRef, type RefObject, useLayoutEffect, useRef } from 'react';

import { Button } from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';

import { useNavActive } from '@/shared/hooks';
import { resolveAppButtonHrefState, useAppHrefClickHandler } from '@/shared/lib';
import {
  CmfActiveLine,
  shouldRenderCmfActiveLine,
  useCmfActiveIndicator,
} from '@/shared/ui/CmfActiveLine';

import { hasAppButtonContent } from '../types/props.types';

const SECTION_SELECTOR = '.cmf-Button-section';

function syncSectionClass(
  root: HTMLElement,
  position: 'left' | 'right',
  next: string | undefined,
  prev: string | undefined,
): string | undefined {
  const el = root.querySelector(`${SECTION_SELECTOR}[data-position="${position}"]`);
  if (el !== null && prev !== undefined && prev.length > 0) {
    for (const token of prev.split(/\s+/)) {
      if (token.length > 0) el.classList.remove(token);
    }
  }
  if (el !== null && next !== undefined && next.length > 0) {
    for (const token of next.split(/\s+/)) {
      if (token.length > 0) el.classList.add(token);
    }
  }
  return next;
}

function useButtonSectionClassNames(
  rootRef: RefObject<HTMLButtonElement | null>,
  sectionClassNames: AppButtonSectionClassNames | undefined,
  leftSection: AppButtonProps['leftSection'],
  rightSection: AppButtonProps['rightSection'],
): void {
  const appliedRef = useRef<AppButtonSectionClassNames>({});

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (root === null) return;

    appliedRef.current = {
      left: syncSectionClass(root, 'left', sectionClassNames?.left, appliedRef.current.left),
      right: syncSectionClass(root, 'right', sectionClassNames?.right, appliedRef.current.right),
    };
  }, [rootRef, sectionClassNames?.left, sectionClassNames?.right, leftSection, rightSection]);
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(function AppButton(
  {
    label,
    href: hrefProp,
    native = false,
    disabled,
    leftSection,
    rightSection,
    sectionClassNames,
    onClick,
    type = 'button',
    justify,
    fullscreen = false,
    active,
    matchRoute,
    activeMatch,
    ...buttonProps
  },
  ref,
) {
  const localRef = useRef<HTMLButtonElement>(null);
  const mergedRef = useMergedRef(ref, localRef);
  const { href, disabledForHref } = resolveAppButtonHrefState(hrefProp, native);
  const hrefNavigationEnabled = href !== undefined;
  const navigateHref = useAppHrefClickHandler(href, hrefNavigationEnabled);
  const resolvedDisabled = disabled ?? disabledForHref;
  const { type: activeType } = useCmfActiveIndicator();
  const { activeAttrs } = useNavActive({
    url: hrefProp,
    active,
    matchRoute,
    activeMatch,
  });

  useButtonSectionClassNames(localRef, sectionClassNames, leftSection, rightSection);

  if (!hasAppButtonContent(label, leftSection, rightSection)) return null;

  const handleClick = hrefNavigationEnabled
    ? (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        navigateHref(event);
      }
    : onClick;

  const showActiveLine = shouldRenderCmfActiveLine({
    ...buttonProps,
    ...activeAttrs,
    disabled: resolvedDisabled,
    activeType,
  });

  return (
    <Button
      ref={mergedRef}
      {...buttonProps}
      {...activeAttrs}
      type={type}
      disabled={resolvedDisabled}
      leftSection={leftSection}
      rightSection={rightSection}
      onClick={handleClick}
      justify={justify}
      fullWidth={fullscreen}
    >
      {label ?? null}
      {showActiveLine && <CmfActiveLine control="button" />}
    </Button>
  );
});

AppButton.displayName = 'AppButton';
