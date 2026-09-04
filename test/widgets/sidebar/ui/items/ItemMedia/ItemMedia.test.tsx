import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ItemMedia } from '@/widgets/sidebar/ui/items/ItemMedia/ItemMedia';

vi.mock('react-inlinesvg', () => ({
  default: ({ ...rest }: Record<string, unknown>) => <svg data-testid="inline-svg" {...rest} />,
}));

describe('ItemMedia', () => {
  it('calls onImgError and hides image when load fails', () => {
    const onImgError = vi.fn();

    render(
      <ItemMedia
        item={{ key: 'home', name: 'Home', url: '/', img: '/missing.png' }}
        alt="Home"
        onImgError={onImgError}
      />,
    );

    fireEvent.error(screen.getByRole('img', { name: 'Home' }));

    expect(onImgError).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('img', { name: 'Home' })).toBeNull();
  });

  it('hides image on error even without onImgError callback', () => {
    render(
      <ItemMedia item={{ key: 'home', name: 'Home', url: '/', img: '/missing.png' }} alt="Home" />,
    );

    fireEvent.error(screen.getByRole('img', { name: 'Home' }));

    expect(screen.queryByRole('img', { name: 'Home' })).toBeNull();
  });

  it('renders inline SVG for .svg menu images', () => {
    render(
      <ItemMedia
        item={{ key: 'home', name: 'Home', url: '/', img: '/uploads/web.svg' }}
        alt="Home"
      />,
    );

    expect(screen.getByTestId('inline-svg')).toHaveAttribute(
      'data-cmf-icon-src',
      '/uploads/web.svg',
    );
    expect(screen.getByRole('img', { name: 'Home' })).toHaveAttribute(
      'data-cmf-icon-src',
      '/uploads/web.svg',
    );
  });
});
