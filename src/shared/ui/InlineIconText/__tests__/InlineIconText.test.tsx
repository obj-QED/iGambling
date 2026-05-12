import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { InlineIconText } from '../ui/InlineIconText';

describe('InlineIconText', () => {
  it('maps iconKey to local mask image variable for background icons', () => {
    const { container } = render(
      <InlineIconText iconTag="i" iconKey="logout">
        Logout
      </InlineIconText>,
    );

    const icon = container.querySelector('i[data-icon-key="logout"]');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('--icon-image: var(--icon-logout-image)');
  });

  it('renders img icon when iconTag is img', () => {
    const { container } = render(
      <InlineIconText iconTag="img" iconSrc="/icons/logout.png" iconAlt="Logout icon">
        Logout
      </InlineIconText>,
    );

    const image = container.querySelector('img[src="/icons/logout.png"]');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Logout icon');
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders svg icon when iconTag is svg', () => {
    render(
      <InlineIconText
        iconTag="svg"
        icon={<svg data-testid="logout-svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>}
      >
        Logout
      </InlineIconText>,
    );

    expect(screen.getByTestId('logout-svg')).toBeInTheDocument();
  });
});
