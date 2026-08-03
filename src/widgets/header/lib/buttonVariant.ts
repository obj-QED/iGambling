import { type CmfButtonVariant, isCmfButtonPaintVariant } from '@/assets/theme';

export function resolveButtonVariant(key: string): CmfButtonVariant {
  return isCmfButtonPaintVariant(key) ? key : 'default';
}
