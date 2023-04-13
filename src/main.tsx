import { ModalDialogProvider } from '@/providers';
import { AppContextProvider } from '@/providers/app-context-provider';
import { defaultRoutes } from '@/routes/routes-config';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { CardsApp } from './cards-app';
import { CardsApiProvider } from './providers/card/api-provider';
import { setupStore } from './store';

const client = new ApolloClient({
  uri: 'http://ng4.velns.org:8000/graphql',
  cache: new InMemoryCache(),
});

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App>
      <Provider store={store}>
        <AppContextProvider apolloClient={client}>
          <ModalDialogProvider>
            <CardsApiProvider>
              <CardsApp routesConfig={defaultRoutes} />
            </CardsApiProvider>
          </ModalDialogProvider>
        </AppContextProvider>
      </Provider>
    </App>
  </React.StrictMode>
);
