import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CmfIcon } from '@/shared/ui/CmfIcon';

vi.mock('react-inlinesvg', () => ({
  default: ({ src, onError }: { src: string; onError?: () => void }) => (
    <svg data-testid="inline-svg" data-src={src} onError={onError} />
  ),
}));

describe('CmfIcon', () => {
  it('hides raster image when load fails', () => {
    const onError = vi.fn();
    const { getByRole } = render(<CmfIcon src="/missing.png" alt="Logo" onError={onError} />);

    const image = getByRole('img', { name: 'Logo' });
    fireEvent.error(image);

    expect(onError).toHaveBeenCalledTimes(1);
    expect(image.className).toMatch(/hidden/);
  });

  it('does not report onError twice for the same src', () => {
    const onError = vi.fn();
    const { getByRole } = render(<CmfIcon src="/missing.png" alt="Logo" onError={onError} />);

    const image = getByRole('img', { name: 'Logo' });
    fireEvent.error(image);
    fireEvent.error(image);

    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('renders inline SVG for .svg sources with data-src', () => {
    const { getByTestId, getByRole } = render(
      <CmfIcon src="/uploads/web.svg" alt="Web" shape="square" radius="round" />,
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
