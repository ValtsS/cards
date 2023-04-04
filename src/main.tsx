import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CardProviderStore, LocalStorage } from '@/providers';
import { AppContextProvider } from '@/providers/app-context-provider';
import { CardsApp } from './cards-app';
import { defaultRoutes } from '@/routes/routes-config';
import { CardsApiProvider } from './providers/card/api-provider';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const cardProvider2 = new CardProviderStore();
const localStoreProvider = new LocalStorage();

const client = new ApolloClient({
  uri: 'http://module04.velns.org:8000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App>
      <AppContextProvider
        localStoreProvider={localStoreProvider}
        formCardProvider={cardProvider2}
        apolloClient={client}
      >
        <CardsApiProvider>
          <CardsApp routesConfig={defaultRoutes} />
        </CardsApiProvider>
      </AppContextProvider>
    </App>
  </React.StrictMode>
);
