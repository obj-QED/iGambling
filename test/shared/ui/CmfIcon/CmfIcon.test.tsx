import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CmfIcon } from '@/shared/ui/CmfIcon';

vi.mock('react-inlinesvg', () => ({
  default: ({ src, onError }: { src: string; onError?: () => void }) => (
    <svg data-testid="inline-svg" data-src={src} onError={onError} />
  ),
}));

describe('CmfIcon', () => {
  it('removes raster image from DOM when load fails', () => {
    const { getByRole, queryByRole } = render(<CmfIcon src="/missing.png" alt="Logo" />);

    fireEvent.error(getByRole('img', { name: 'Logo' }));

    expect(queryByRole('img', { name: 'Logo' })).toBeNull();
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
