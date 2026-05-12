import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppHeaderUserActions } from './AppHeaderUserActions';

describe('AppHeaderUserActions', () => {
  it('uses iconKey to map mask image for background icons', () => {
    const { container } = render(
      <AppHeaderUserActions
        classes={{
          'root__userActions-item': 'user-action',
          'root__userActions-item_icon_logout': 'logout-mask',
        }}
      />,
    );

    const icon = container.querySelector('i[data-icon-key="logout"]');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('--icon-image: var(--icon-logout-image)');
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('passes img icon configuration to InlineIconText', () => {
    const { container } = render(
      <AppHeaderUserActions
        classes={{
          'root__userActions-item': 'user-action',
          'root__userActions-item_icon_logout': 'logout-mask',
        }}
        iconTag="img"
        iconSrc="/icons/logout.png"
        iconAlt="Logout icon"
      />,
    );

    const image = container.querySelector('img[src="/icons/logout.png"]');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Logout icon');
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
