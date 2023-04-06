import { CardProviderStore, LocalStorage, ModalDialogProvider } from '@/providers';
import { AppContextProvider } from '@/providers/app-context-provider';
import { defaultRoutes } from '@/routes/routes-config';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CardsApp } from './cards-app';
import { CardsApiProvider } from './providers/card/api-provider';
import { NotificationsProvider } from './providers/notifications-provider/notifications-provider';

const cardProvider2 = new CardProviderStore();
const localStoreProvider = new LocalStorage();

const client = new ApolloClient({
  uri: 'http://ng4.velns.org:8000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App>
      <NotificationsProvider>
        <AppContextProvider
          localStoreProvider={localStoreProvider}
          formCardProvider={cardProvider2}
          apolloClient={client}
        >
          <ModalDialogProvider>
            <CardsApiProvider>
              <CardsApp routesConfig={defaultRoutes} />
            </CardsApiProvider>
          </ModalDialogProvider>
        </AppContextProvider>
      </NotificationsProvider>
    </App>
  </React.StrictMode>
);
