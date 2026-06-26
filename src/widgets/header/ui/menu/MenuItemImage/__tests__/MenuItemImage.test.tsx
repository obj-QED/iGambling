import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MenuItemImage } from '@/widgets/header/ui/menu/MenuItemImage/MenuItemImage';

describe('MenuItemImage', () => {
  it('shows HeaderPhotoFallback when image load fails', () => {
    render(
      <MenuItemImage
        item={{ key: 'profile', name: '', url: '/profile', img: '/missing.png' }}
        alt="profile"
      />,
    );

    fireEvent.error(screen.getByRole('img', { name: 'profile' }));

    expect(screen.queryByRole('img', { name: 'profile' })).toBeNull();
    expect(document.querySelector('svg')).not.toBeNull();
  });
});
