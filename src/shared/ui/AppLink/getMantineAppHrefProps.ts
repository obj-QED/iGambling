import { Link } from 'react-router-dom';

import { getAppHrefKind } from '@/shared/lib';

export function getMantineAppHrefProps(url: string) {
  const kind = getAppHrefKind(url);

  if (kind === 'external') {
    return {
      component: 'a' as const,
      href: url,
      rel: 'noopener noreferrer',
      target: '_blank' as const,
    };
  }

  if (kind === 'internal') {
    return {
      component: Link,
      to: url,
    };
  }

  return {
    'aria-disabled': true as const,
    component: 'button' as const,
    'data-invalid-href': true as const,
    disabled: true as const,
    type: 'button' as const,
  };
}
