import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MenuItemMedia } from '@/widgets/sidebar/ui/menu/MenuItemMedia/MenuItemMedia';

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
});
