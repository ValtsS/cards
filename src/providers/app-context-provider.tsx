import { ApolloClient } from '@apollo/client';
import React from 'react';

type AppContextValue = {
  apolloClient: ApolloClient<unknown> | null;
};

export const AppContext = React.createContext<AppContextValue>({
  apolloClient: null,
});

type AppContextProviderProps = {
  children: React.ReactNode;
  apolloClient: ApolloClient<unknown> | null;
};

export const AppContextProvider = ({ children, apolloClient }: AppContextProviderProps) => {
  return (
    <AppContext.Provider
      value={{
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
