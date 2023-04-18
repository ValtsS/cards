import { ApolloClient, InMemoryCache } from '@apollo/client';
import React, { ReactNode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CardsApp } from './cards-app';
import { AppContextProvider, ModalDialogProvider } from './providers';
import { defaultRoutes } from './routes';
import { setupStore } from './store';

declare global {
  interface Window {
    __PRELOADED_STATE__?: string;
  }
}

async function entryRender() {
  const client = new ApolloClient({
    uri: 'http://ng4.velns.org:8000/graphql',
    cache: new InMemoryCache(),
  });

  const preload = window.__PRELOADED_STATE__;

  const initState = preload ? JSON.parse(atob(preload)) : {};

  const store = setupStore(initState);
  const app = (
    <BrowserRouter>
      <CardsApp routesConfig={defaultRoutes} />
    </BrowserRouter>
  );

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

export async function gc(): Promise<ReactNode> {
  return <div id="root">{await entryRender()}</div>;
}

const root = document.getElementById('root') as HTMLElement;

hydrateRoot(root, await entryRender());
