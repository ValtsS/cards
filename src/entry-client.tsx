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

async function entryRender() {
  const client = new ApolloClient({
    uri: 'http://ng4.velns.org:8000/graphql',
    cache: new InMemoryCache(),
  });

  const store = setupStore();

  let app = <CardsApp routesConfig={defaultRoutes} />;
  app = <BrowserRouter>{app}</BrowserRouter>;

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
