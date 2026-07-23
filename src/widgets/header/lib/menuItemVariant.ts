import type { HeaderMenuItem } from '../types';
import type { CmfActionIconVariant, CmfButtonVariant } from '@/assets/theme';

import { resolveButtonVariant } from './buttonVariant';
import { isSpecialBlockKey } from './itemUtils';

type MenuItemVariantSource = Pick<HeaderMenuItem, 'key' | 'type'>;

export function resolveMenuItemButtonVariant(item: MenuItemVariantSource): CmfButtonVariant {
  if (isSpecialBlockKey(item.key) === false && item.type === 'link') return 'transparent';
  return resolveButtonVariant(item.key ?? '');
}

export function resolveMenuItemActionIconVariant(
  item: Pick<HeaderMenuItem, 'key' | 'type'>,
): CmfActionIconVariant {
  if (isSpecialBlockKey(item.key) === false && item.type === 'link') return 'transparent';
  return 'default';
}
