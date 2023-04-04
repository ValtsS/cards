import React from 'react';
import { createContext, useState } from 'react';
import { useAppContext } from '../app-context-provider';
import { CardData } from './card-provider';
import { cardTestData } from './card-test-data';

interface ProviderState {
  cards: CardData[];
  loading: boolean;
  exception: Error | null;
  errorcounter: number;
}

interface ContextValue {
  state: ProviderState;
  loadCards: (query: string) => Promise<void>;
}

const CardsApiContext = createContext<ContextValue>({
  state: {
    cards: [],
    loading: false,
    errorcounter: 0,
    exception: null,
  },
  loadCards: async () => {},
});

interface CardsApiProviderProps {
  children: React.ReactNode;
}

export function CardsApiProvider(props: CardsApiProviderProps) {
  const [state, setState] = useState<ProviderState>({
    cards: [],
    loading: false,
    errorcounter: 0,
    exception: null,
  });

  const { apolloClient } = useAppContext();

  const loadCards = async (query: string) => {
    setState( (prevState) => ({ ...prevState, loading: true }));

    console.log('Loadcards ', query);
    console.log('aplollo', apolloClient);

    try {
      setState((prevState) => ({ ...prevState, loading: true, exception: null }));

      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          cards: cardTestData,
          errorcounter: 0,
          loading: false,
          exception: null,
        }));
        console.log('Loaded!');
      }, 500);
    } catch (error) {
      if (error instanceof Error)
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errorcounter: prevState.errorcounter + 1,
          exception: error as Error,
        }));
      else
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errorcounter: prevState.errorcounter + 1,
          exception: new Error('unknown type exception'),
        }));
    }
  };

  const contextValue: ContextValue = {
    state,
    loadCards,
  };

  return <CardsApiContext.Provider value={contextValue}>{props.children}</CardsApiContext.Provider>;
}

export function useCardsApiContext() {
  const store = React.useContext(CardsApiContext);
  if (!store) {
    throw new Error('useCardsApiContext must be used within a CardsApiProvider');
  }
  return store;
}
