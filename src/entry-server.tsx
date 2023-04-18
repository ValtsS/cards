import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { CardsApp } from './cards-app';
import { AppContextProvider, ModalDialogProvider } from './providers';
import { defaultRoutes } from './routes';
import { setupStore } from './store';
import pkg from '@apollo/client';
import { fetchCards } from './slices/api/cardsApi';
import { renderToString } from 'react-dom/server';
import { CardShellLoader } from './components/card-shell-loader';
import { getDataFromTree } from '@apollo/client/react/ssr';
const { ApolloClient, InMemoryCache } = pkg;

async function entryRender(url?: string) {
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
}

export async function gc(url: string): Promise<ReactNode> {
  return <div id="root">{await entryRender(url)}</div>;
}
