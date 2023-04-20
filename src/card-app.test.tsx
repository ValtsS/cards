import { RouteConfig } from '@/routes/';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { RootLayout } from 'routes/root-layout';
import { CardsApp } from './cards-app';
import { AboutPage } from './pages';
import { BrowserRouter } from 'react-router-dom';

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

    act(() =>
      render(
        <BrowserRouter>
          <CardsApp routesConfig={routes} />
        </BrowserRouter>
      )
    );

    expect(screen.getByText('Fantastic about page of module01 react project')).toBeInTheDocument();
  });
});
