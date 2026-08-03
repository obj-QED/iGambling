import type { CmfIconRadius, CmfIconShape } from '@/shared/types/cmfIcon.types';

export type ResolveCmfIconShapeItem = {
  imgShape?: string;
};

export type ResolveCmfIconRadiusItem = {
  imgRadius?: string;
};

export type CmfIconDataAttrs = {
  'data-cmf-icon-src': string;
  'data-cmf-icon-shape': CmfIconShape;
  'data-cmf-icon-radius': CmfIconRadius;
};
