import React from 'react';
import { CardProviderStore } from './card';
import { LocalStorage } from './storage';

type AppContextValue = {
  localStore: LocalStorage;
  cardProvider: CardProviderStore;
  formCardProvider: CardProviderStore;
};

export const AppContext = React.createContext<AppContextValue>({
  localStore: new LocalStorage(),
  cardProvider: new CardProviderStore(),
  formCardProvider: new CardProviderStore(),
});

type AppContextProviderProps = {
  children: React.ReactNode;
  localStoreProvider: LocalStorage;
  cardProvider: CardProviderStore;
  formCardProvider: CardProviderStore;
};

export const AppContextProvider = ({
  children,
  localStoreProvider,
  cardProvider,
  formCardProvider: cardProvider2,
}: AppContextProviderProps) => {
  return (
    <AppContext.Provider
      value={{
        localStore: localStoreProvider,
        cardProvider: cardProvider,
        formCardProvider: cardProvider2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
