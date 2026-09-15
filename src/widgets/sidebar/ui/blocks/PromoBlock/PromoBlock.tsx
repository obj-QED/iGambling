import type { BlockProps } from '../../../types';

import { memo } from 'react';

import {
  AdapterBoundary,
  LazyHost,
  preloadAdapters,
  preloadWrapper,
  useAdapter,
  useWrapper,
} from '@/shared/lib';
import { isCapabilityEnabled } from '@/shared/schema';

import { useSidebarConfig } from '../../../context';
import { resolveItemLabel } from '../../../lib';
import { PROMO_ADAPTER_KEYS, PROMO_ADAPTERS } from './adapters';

/**
 * Sync promo block router (`timer` / `wheel_mdl`).
 * Chrome via `blockVariants.promo` (row | icon) — compact/slideout resolve to icon.
 */
function PromoBlockComponent({ item, className }: BlockProps) {
  const { blockVariants, wrappers, capabilities } = useSidebarConfig();
  const Adapter = useAdapter(PROMO_ADAPTERS, blockVariants.promo, PROMO_ADAPTER_KEYS);
  const wrapperMode = wrappers.promo;
  const Wrapper = useWrapper(wrapperMode);
  const label = resolveItemLabel(item);
  const enabled = isCapabilityEnabled(capabilities, 'promo');

  if (!enabled || !Adapter) return null;

  const warmSelected = () => {
    preloadAdapters(PROMO_ADAPTERS, blockVariants.promo, PROMO_ADAPTER_KEYS);
    preloadWrapper(wrapperMode);
  };

  const adapterNode = <LazyHost component={Adapter} item={item} className={className} />;

  if (!wrapperMode || wrapperMode === 'none') {
    return (
      <AdapterBoundary>
        <span onPointerEnter={warmSelected}>{adapterNode}</span>
      </AdapterBoundary>
    );
  }

  return (
    <AdapterBoundary>
      <span onPointerEnter={warmSelected}>
        <LazyHost
          component={Wrapper}
          target={adapterNode}
          title={label.length > 0 ? label : (item.name ?? 'Promo')}
        >
          {adapterNode}
        </LazyHost>
      </span>
    </AdapterBoundary>
  );
}

export const PromoBlock = memo(PromoBlockComponent);
PromoBlock.displayName = 'PromoBlock';
