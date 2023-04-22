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
    __API_URL__?: string;
  }
}

async function entryRender() {
  const apiUrl = window.__API_URL__ && atob(window.__API_URL__);

  const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache(),
  });

  const preload = window.__PRELOADED_STATE__;

  const initState = preload ? JSON.parse(atob(preload)) : {};

  if (preload) delete window.__PRELOADED_STATE__;

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

export async function getContent(): Promise<ReactNode> {
  return <div id="root">{await entryRender()}</div>;
}

async function init() {
  const root = document.getElementById('root') as HTMLElement;
  hydrateRoot(root, await entryRender());
}

init();
