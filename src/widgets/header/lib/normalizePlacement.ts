import type { HeaderCustomBlockPlacement } from '@/shared/config/headerSettings';

export type NormalizedCustomBlockPlacement =
  | { kind: 'in-section'; sectionKey: string; at: 'start' | 'end' | number }
  | { kind: 'new-section'; header: 'start' | 'end' }
  | { kind: 'new-section'; beforeSection: string }
  | { kind: 'new-section'; afterSection: string };

export function normalizeCustomBlockPlacement(
  placement: HeaderCustomBlockPlacement,
): NormalizedCustomBlockPlacement | null {
  if (placement === 'prepend') {
    return { kind: 'new-section', header: 'start' };
  }

  if (placement === 'append') {
    return { kind: 'new-section', header: 'end' };
  }

  if ('section' in placement && 'at' in placement) {
    return { kind: 'in-section', sectionKey: placement.section, at: placement.at };
  }

  if ('sectionKey' in placement && 'position' in placement) {
    return { kind: 'in-section', sectionKey: placement.sectionKey, at: placement.position };
  }

  if ('beforeSection' in placement) {
    return { kind: 'new-section', beforeSection: placement.beforeSection };
  }

  if ('afterSection' in placement) {
    return { kind: 'new-section', afterSection: placement.afterSection };
  }

  if ('header' in placement) {
    return { kind: 'new-section', header: placement.header };
  }

  return null;
}
