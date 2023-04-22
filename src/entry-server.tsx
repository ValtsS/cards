import pkg from '@apollo/client';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { CardsApp } from './cards-app';
import { AppContextProvider, ModalDialogProvider } from './providers';
import { defaultRoutes } from './routes';
import { fetchCards, fetchParams } from './slices/api/cardsApi';
import { setupStore } from './store';
const { ApolloClient, InMemoryCache } = pkg;

const apiUrl = process.env.GQL_API;

if (!apiUrl) {
  console.error(`GQL_API is not specified in .env`);
}

async function entryRender(url?: string): Promise<{ nodes: JSX.Element; preloadedJson: string }> {
  const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache(),
  });

  const updatedStore = setupStore();
  const defaultSearchParams: fetchParams = {
    client,
    limit: 25,
    offset: 0,
    order: [],
    params: {
      searchQuery: '',
      uuid: '',
    },
  };

  await updatedStore.dispatch(fetchCards(defaultSearchParams));
  const preloadedJson = JSON.stringify(updatedStore.getState());

  const app = (
    <StaticRouter location={url ?? '/'}>
      <CardsApp routesConfig={defaultRoutes} />
    </StaticRouter>
  );

  const nodes = (
    <React.StrictMode>
      <App>
        <Provider store={updatedStore}>
          <AppContextProvider apolloClient={client}>
            <ModalDialogProvider>{app}</ModalDialogProvider>
          </AppContextProvider>
        </Provider>
      </App>
    </React.StrictMode>
  );

  return { nodes, preloadedJson };
}

export async function getContent(css: string, url: string): Promise<ReactNode> {
  const { nodes, preloadedJson } = await entryRender(url);
  const base64state = Buffer.from(preloadedJson).toString('base64');
  const base64api = Buffer.from(apiUrl ?? '').toString('base64');
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          {css && <link rel="stylesheet" href={css} />}
        </head>
        <body>
          <div id="root">{nodes}</div>
          <script
            dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__="${base64state}"` }}
          />
          <script dangerouslySetInnerHTML={{ __html: `window.__API_URL__="${base64api}"` }} />
        </body>
      </html>
    </>
  );
}
