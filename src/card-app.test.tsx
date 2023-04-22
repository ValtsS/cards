import { RouteConfig } from '@/routes/';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { RootLayout } from 'routes/root-layout';
import { CardsApp } from './cards-app';
import { AboutPage } from './pages';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './store';
import { Provider } from 'react-redux';

describe('CardsApp', () => {
  it('should render main page with correct props', async () => {
    const store = setupStore();

    const routes: RouteConfig[] = [
      {
        path: '/',
        element: (
          <Provider store={store}>
            <RootLayout>
              <AboutPage />
            </RootLayout>
          </Provider>
        ),
      },
    ];

    act(() =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CardsApp routesConfig={routes} />
          </BrowserRouter>
        </Provider>
      )
    );

    expect(screen.getByText('Fantastic about page of module01 react project')).toBeInTheDocument();
  });
});
