import { ApolloClient } from '@apollo/client';
import React from 'react';
import { LocalStorage } from './storage';

type AppContextValue = {
  localStore: LocalStorage;
  apolloClient: ApolloClient<unknown> | null;
};

export const AppContext = React.createContext<AppContextValue>({
  localStore: new LocalStorage(),
  apolloClient: null,
});

type AppContextProviderProps = {
  children: React.ReactNode;
  localStoreProvider: LocalStorage;
  apolloClient: ApolloClient<unknown> | null;
};

export const AppContextProvider = ({
  children,
  localStoreProvider,
  apolloClient,
}: AppContextProviderProps) => {
  return (
    <AppContext.Provider
      value={{
        localStore: localStoreProvider,
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
