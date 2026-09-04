import type { BlockProps } from '../../../types';

import { createElement, memo } from 'react';

import { AdapterBoundary, useAdapter, useWrapper } from '@/shared/lib';
import { isCapabilityEnabled } from '@/shared/schema';

import { useSidebarConfig } from '../../../context';
import { resolveItemLabel } from '../../../lib';
import { PROMO_ADAPTER_KEYS, PROMO_ADAPTERS } from './adapters';

/**
 * Sync promo block router (`timer` / `wheel_mdl`).
 * Compact: typePack.blocks → PromoIconVariant (sync).
 */
function PromoBlockComponent({ item, className }: BlockProps) {
  const { blockVariants, wrappers, capabilities } = useSidebarConfig();
  const Adapter = useAdapter(PROMO_ADAPTERS, blockVariants.promo, PROMO_ADAPTER_KEYS);
  const wrapperMode = wrappers.promo;
  const Wrapper = useWrapper(wrapperMode);
  const label = resolveItemLabel(item);
  const enabled = isCapabilityEnabled(capabilities, 'promo');

  if (!enabled || !Adapter) return null;

  const adapterNode = createElement(Adapter, { item, className });

  if (!wrapperMode || wrapperMode === 'none') {
    return <AdapterBoundary>{adapterNode}</AdapterBoundary>;
  }

  return (
    <AdapterBoundary>
      {createElement(Wrapper, {
        target: adapterNode,
        title: label.length > 0 ? label : (item.name ?? 'Promo'),
        children: adapterNode,
      })}
    </AdapterBoundary>
  );
}

export const PromoBlock = memo(PromoBlockComponent);
PromoBlock.displayName = 'PromoBlock';
