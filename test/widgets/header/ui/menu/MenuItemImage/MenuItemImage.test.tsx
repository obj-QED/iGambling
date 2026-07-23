import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEFAULT_HEADER_CONFIG } from '@/widgets/header/config/defaults';
import { ConfigProvider } from '@/widgets/header/context/provider';
import { MenuItemImage } from '@/widgets/header/ui/menu/MenuItemImage/MenuItemImage';

describe('MenuItemImage', () => {
  it('removes image from DOM when load fails', () => {
    render(
      <ConfigProvider config={DEFAULT_HEADER_CONFIG}>
        <MenuItemImage
          item={{ key: 'profile', name: '', url: '/profile', img: '/missing.png' }}
          alt="profile"
        />
      </ConfigProvider>,
    );

    fireEvent.error(screen.getByRole('img', { name: 'profile' }));

    expect(screen.queryByRole('img', { name: 'profile' })).toBeNull();
  });
});
