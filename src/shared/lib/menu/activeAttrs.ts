export type NavActiveAttrs = {
  'data-active'?: 'true';
};

export function activeAttrs(isActive: boolean): NavActiveAttrs {
  return isActive ? { 'data-active': 'true' } : {};
}
