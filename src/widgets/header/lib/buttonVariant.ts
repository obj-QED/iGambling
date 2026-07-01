import { CMF_BUTTON_VARIANTS, type CmfButtonVariant } from '@/assets/theme';

export function resolveButtonVariant(key: string): CmfButtonVariant {
  return (CMF_BUTTON_VARIANTS as readonly string[]).includes(key)
    ? (key as CmfButtonVariant)
    : 'default';
}
