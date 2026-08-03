export type MenuActiveAttrs = {
  'data-active'?: 'true';
};

export function menuActiveAttrs(isActive: boolean): MenuActiveAttrs {
  return isActive ? { 'data-active': 'true' } : {};
}
