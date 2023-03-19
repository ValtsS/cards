import React from 'react';
import { CardProviderStore } from './card-provider';
import { LocalStorage } from './local-storage';

type AppContextValue = {
  localstore: LocalStorage;
  cardprovider: CardProviderStore;
};

export const AppContext = React.createContext<AppContextValue>({
  localstore: new LocalStorage(),
  cardprovider: new CardProviderStore(),
});

type AppContextProviderProps = {
  children: React.ReactNode;
  localStoreProvider: LocalStorage;
  cardProvider: CardProviderStore;
};

export const AppContextProvider = ({
  children,
  localStoreProvider,
  cardProvider,
}: AppContextProviderProps) => {
  return (
    <AppContext.Provider value={{ localstore: localStoreProvider, cardprovider: cardProvider }}>
      {children}
    </AppContext.Provider>
  );
};
