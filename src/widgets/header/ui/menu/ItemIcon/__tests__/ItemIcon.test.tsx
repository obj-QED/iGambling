import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ItemIcon } from '@/widgets/header/ui/menu/ItemIcon/ItemIcon';

describe('ItemIcon', () => {
  it('hides image when load fails', () => {
    render(<ItemIcon src="/missing.png" alt="Logo" />);

    const image = screen.getByRole('img', { name: 'Logo' });
    fireEvent.error(image);

    expect(image.className).toMatch(/hidden/);
  });
});
