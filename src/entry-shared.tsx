import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { CardsApp } from './cards-app';
import { AppContextProvider, ModalDialogProvider } from './providers';
import { defaultRoutes } from './routes';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setupStore } from './store';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

export const entryRender = (ssr: boolean, url?: string) => {
  const client = new ApolloClient({
    uri: 'http://ng4.velns.org:8000/graphql',
    cache: new InMemoryCache(),
  });

  const store = setupStore();

  let app = <CardsApp routesConfig={defaultRoutes} />;

  if (ssr) app = <StaticRouter location={url ?? '/'}>{app}</StaticRouter>;
  else app = <BrowserRouter>{app}</BrowserRouter>;

  return (
    <React.StrictMode>
      <App>
        <Provider store={store}>
          <AppContextProvider apolloClient={client}>
            <ModalDialogProvider>{app}</ModalDialogProvider>
          </AppContextProvider>
        </Provider>
      </App>
    </React.StrictMode>
  );
};
