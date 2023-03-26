import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import CardsApp from './cards-app';
import { CardProviderStore, LocalStorage } from '@/providers';
import { AppContextProvider } from '@/providers/app-context-provider';

const cardProvider = new CardProviderStore();
const cardProvider2 = new CardProviderStore();
const localStoreProvider = new LocalStorage();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App>
      <AppContextProvider
        cardProvider={cardProvider}
        localStoreProvider={localStoreProvider}
        formCardProvider={cardProvider2}
      >
        <CardsApp />
      </AppContextProvider>
    </App>
  </React.StrictMode>
);
