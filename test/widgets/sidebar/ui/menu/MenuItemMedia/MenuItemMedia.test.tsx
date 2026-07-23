import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MenuItemMedia } from '@/widgets/sidebar/ui/menu/MenuItemMedia/MenuItemMedia';

vi.mock('react-inlinesvg', () => ({
  default: ({ src }: { src: string }) => <svg data-testid="inline-svg" data-src={src} />,
}));

describe('MenuItemMedia', () => {
  it('calls onImgError and hides image when load fails', () => {
    const onImgError = vi.fn();

    render(
      <MenuItemMedia
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
      <MenuItemMedia
        item={{ key: 'home', name: 'Home', url: '/', img: '/missing.png' }}
        alt="Home"
      />,
    );

    fireEvent.error(screen.getByRole('img', { name: 'Home' }));

    expect(screen.queryByRole('img', { name: 'Home' })).toBeNull();
  });

  it('renders inline SVG for .svg menu images', () => {
    render(
      <MenuItemMedia
        item={{ key: 'home', name: 'Home', url: '/', img: '/uploads/web.svg' }}
        alt="Home"
      />,
    );

    expect(screen.getByTestId('inline-svg')).toHaveAttribute('data-src', '/uploads/web.svg');
    expect(screen.getByRole('img', { name: 'Home' })).toHaveAttribute(
      'data-cmf-icon-src',
      '/uploads/web.svg',
    );
  });
});
