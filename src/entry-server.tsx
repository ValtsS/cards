import pkg from '@apollo/client';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { CardsApp } from './cards-app';
import { AppContextProvider, ModalDialogProvider } from './providers';
import { getCards } from './providers/card/api-client';
import { defaultRoutes } from './routes';
import { CardsResultStore, StoreStatus } from './slices/api/cardsApi';
import { RootState, setupStore } from './store';
const { ApolloClient, InMemoryCache } = pkg;

async function entryRender(url?: string) {
  const client = new ApolloClient({
    uri: 'http://ng4.velns.org:8000/graphql',
    cache: new InMemoryCache(),
  });

  const store = setupStore();

  const { cards: loaded, info } = await getCards(
    client,
    {
      searchQuery: '',
      uuid: '',
    },
    25,
    0,
    []
  );

  const initState = store.getState();

  const newStateX: CardsResultStore = {
    cards: loaded,
    info,
    status: StoreStatus.succeeded,
    query: '',
    errorcounter: 0,
    limit: 25,
    offset: 0,
    orderBy: '',
  };

  const newState: RootState = {
    ...initState,
    cardsAPI: {
      ...initState.cardsAPI,
      ...newStateX,
    },
  };

  const updatedStore = setupStore(newState);

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

export async function gc(url: string): Promise<ReactNode> {
  const { nodes, preloadedJson } = await entryRender(url);
  const base64 = Buffer.from(preloadedJson).toString('base64');

  return (
    <>
      <div id="root">{nodes}</div>
      <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__="${base64}"` }} />
    </>
  );
}
