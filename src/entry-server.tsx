import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { CardsApp } from './cards-app';
import { AppContextProvider, ModalDialogProvider } from './providers';
import { defaultRoutes } from './routes';
import { setupStore } from './store';
import pkg from '@apollo/client';
const { ApolloClient, InMemoryCache } = pkg;

export const entryRender = (url?: string) => {
  const client = new ApolloClient({
    uri: 'http://ng4.velns.org:8000/graphql',
    cache: new InMemoryCache(),
  });

  const store = setupStore();

  let app = <CardsApp routesConfig={defaultRoutes} />;
  app = <StaticRouter location={url ?? '/'}>{app}</StaticRouter>;

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

export function gc(url: string): ReactNode {
  return <div id="root">{entryRender(url)}</div>;
}
