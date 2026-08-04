import type { BlockProps } from '@/widgets/header/types';
import type { ComponentType } from 'react';

import { describe, expect, it } from 'vitest';

import { resolveBlockVariantComponent } from '@/widgets/header/lib/resolveBlockVariantComponent';

const Compact = (() => null) as ComponentType<BlockProps>;
const Full = (() => null) as ComponentType<BlockProps>;
const Input = (() => null) as ComponentType<BlockProps>;

const registry: Record<string, ComponentType<BlockProps>> = {
  compact: Compact,
  full: Full,
  input: Input,
};

describe('resolveBlockVariantComponent', () => {
  it('uses registered variant when present', () => {
    expect(resolveBlockVariantComponent(registry, 'full')).toBe(Full);
    expect(resolveBlockVariantComponent(registry, 'input')).toBe(Input);
  });

  it('falls back to compact for unknown or empty', () => {
    expect(resolveBlockVariantComponent(registry, undefined)).toBe(Compact);
    expect(resolveBlockVariantComponent(registry, '')).toBe(Compact);
    expect(resolveBlockVariantComponent(registry, 'drawer')).toBe(Compact);
  });

  it('falls back to first entry when compact missing', () => {
    const only: Record<string, ComponentType<BlockProps>> = { full: Full };
    expect(resolveBlockVariantComponent(only, 'nope')).toBe(Full);
  });
});
