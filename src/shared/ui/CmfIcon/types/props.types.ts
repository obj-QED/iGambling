import type { CmfIconRadius, CmfIconShape } from '@/shared/types/cmfIcon.types';

export type CmfIconProps = {
  src: string;
  alt: string;
  shape?: CmfIconShape;
  radius?: CmfIconRadius;
  className?: string;
  onError?: () => void;
};
