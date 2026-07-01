import type { AppButtonProps } from '../types';

import { forwardRef } from 'react';

import { Button } from '@mantine/core';

import { isValidAppHref } from '@/shared/lib';
import { AppLink } from '@/shared/ui';

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(function AppButton(
  { label, href, native = false, disabled, leftSection, rightSection, ...buttonProps },
  ref,
) {
  const hasLabel = (label?.length ?? 0) > 0;
  const hasSection = leftSection !== undefined || rightSection !== undefined;

  if (hasLabel === false && hasSection === false) return null;

  const content = hasLabel ? label : null;
  const sharedProps = {
    ref,
    disabled,
    leftSection,
    rightSection,
    ...buttonProps,
  };

  if (native === true) {
    return <Button {...sharedProps}>{content}</Button>;
  }

  if (href === undefined || isValidAppHref(href) === false) {
    return (
      <Button {...sharedProps} disabled>
        {content}
      </Button>
    );
  }

  return (
    <Button {...sharedProps} component={AppLink} href={href}>
      {content}
    </Button>
  );
});

AppButton.displayName = 'AppButton';
