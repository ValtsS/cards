import { CardProviderStore, LocalStorage } from '@/providers';
import { AppContextProvider } from '@/providers/app-context-provider';
import { defaultRoutes } from '@/routes/routes-config';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CardsApp } from './cards-app';
import { CardsApiProvider } from './providers/card/api-provider';

const cardProvider2 = new CardProviderStore();
const localStoreProvider = new LocalStorage();

const client = new ApolloClient({
  uri: 'http://lyra.velns.org:8000/graphql',
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
