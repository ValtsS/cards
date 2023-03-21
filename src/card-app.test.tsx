import React from 'react';
import { act, render, screen } from '@testing-library/react';
import CardsApp from './cards-app';
import { RootLayout } from 'routes/root-layout';
import AboutPage from 'components/about-page';
import { RouteConfig } from 'routes/routes-config';

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
