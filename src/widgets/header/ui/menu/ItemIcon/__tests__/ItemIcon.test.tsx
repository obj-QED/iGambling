import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DEFAULT_HEADER_CONFIG } from '@/widgets/header/config/defaults';
import { ConfigProvider } from '@/widgets/header/context/provider';
import { ItemIcon } from '@/widgets/header/ui/menu/ItemIcon/ItemIcon';

vi.mock('react-inlinesvg', () => ({
  default: ({ src, onError }: { src: string; onError?: () => void }) => (
    <svg data-testid="inline-svg" data-src={src} onError={onError} />
  ),
}));

describe('ItemIcon', () => {
  it('hides raster image when load fails', () => {
    const { getByRole } = render(
      <ConfigProvider config={DEFAULT_HEADER_CONFIG}>
        <ItemIcon src="/missing.png" alt="Logo" />
      </ConfigProvider>,
    );

    const image = getByRole('img', { name: 'Logo' });
    fireEvent.error(image);

    expect(image.className).toMatch(/hidden/);
  });

  it('renders inline SVG for .svg sources', () => {
    const { getByTestId, getByRole } = render(
      <ConfigProvider config={DEFAULT_HEADER_CONFIG}>
        <ItemIcon src="/uploads/web.svg" alt="Web" shape="square" radius="round" />
      </ConfigProvider>,
    );

    expect(getByTestId('inline-svg')).toHaveAttribute('data-src', '/uploads/web.svg');
    expect(getByRole('img', { name: 'Web' })).toHaveAttribute(
      'data-cmf-icon-src',
      '/uploads/web.svg',
    );
    expect(getByRole('img', { name: 'Web' })).toHaveAttribute('data-cmf-icon-shape', 'square');
    expect(getByRole('img', { name: 'Web' })).toHaveAttribute('data-cmf-icon-radius', 'round');
  });
});
