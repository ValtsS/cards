import React from 'react';
import { CardProviderStore } from './card-provider';
import { LocalStorage } from './local-storage';

type AppContextValue = {
  localstore: LocalStorage;
  cardprovider: CardProviderStore;
  formCardProvider: CardProviderStore;
};

export const AppContext = React.createContext<AppContextValue>({
  localstore: new LocalStorage(),
  cardprovider: new CardProviderStore(),
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
        localstore: localStoreProvider,
        cardprovider: cardProvider,
        formCardProvider: cardProvider2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
