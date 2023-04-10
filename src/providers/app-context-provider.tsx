import { ApolloClient } from '@apollo/client';
import React from 'react';
import { CardProviderStore } from './card';
import { LocalStorage } from './storage';

type AppContextValue = {
  localStore: LocalStorage;
  formCardProvider: CardProviderStore;
  apolloClient: ApolloClient<unknown> | null;
};

export const AppContext = React.createContext<AppContextValue>({
  localStore: new LocalStorage(),
  formCardProvider: new CardProviderStore(),
  apolloClient: null,
});

type AppContextProviderProps = {
  children: React.ReactNode;
  localStoreProvider: LocalStorage;
  formCardProvider: CardProviderStore;
  apolloClient: ApolloClient<unknown> | null;
};

export const AppContextProvider = ({
  children,
  localStoreProvider,
  formCardProvider: cardProvider,
  apolloClient,
}: AppContextProviderProps) => {
  return (
    <AppContext.Provider
      value={{
        localStore: localStoreProvider,
        formCardProvider: cardProvider,
        apolloClient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const store = React.useContext(AppContext);
  if (!store) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return store;
}
