import { memo } from 'react';

import { Container, Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

const HEADING_ORDERS = [1, 2, 3, 4, 5, 6] as const;

function HomePageComponent() {
  return (
    <main>
      <Container size="responsive">
        <Stack gap="xs" className={'container'}>
          {HEADING_ORDERS.map((order) => (
            <Title key={order} order={order}>
              Заголовок h{order}
            </Title>
          ))}
        </Stack>
        <p>Минимальная сборка: прокси + авторизация + bootstrap.</p>
        <nav style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <Link to="/auth">Sign in</Link>
          <Link to="/register">Register</Link>
        </nav>
      </Container>

    </main>
  );
}

export const HomePage = memo(HomePageComponent);
HomePage.displayName = 'HomePage';
