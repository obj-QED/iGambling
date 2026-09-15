import type { CmfIconRadius, CmfIconShape } from '@/shared/types/cmfIcon.types';

export type CmfIconProps = {
  src: string;
  alt: string;
  shape?: CmfIconShape;
  radius?: CmfIconRadius;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  onError?: () => void;
};
