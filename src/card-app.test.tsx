import React from 'react';
import { act, render, screen } from '@testing-library/react';
import CardsApp from './cards-app';
import { RootLayout } from 'routes/root-layout';
import { RouteConfig } from './routes/routes-config';
import { AboutPage } from './pages';

describe('CardsApp', () => {
  it('should render main page with correct props', async () => {
    const routes: RouteConfig[] = [
      {
        path: '/',
        element: (
          <RootLayout>
            <AboutPage />
          </RootLayout>
        ),
      },
    ];

    act(() => render(<CardsApp routesConfig={routes} />));

    expect(screen.getByText('Fantastic about page of module01 react project')).toBeInTheDocument();
  });
});
