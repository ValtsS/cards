import * as Schema from '@/__generated__/graphql';
import { ApolloClient } from '@apollo/client';
import React, { createContext, useState } from 'react';
import { useAppContext } from '../app-context-provider';
import { CardData } from './card-provider';

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

const getCards = async (
  client: ApolloClient<unknown>,
  params: Schema.CardFilterInput
): Promise<Schema.Card[]> => {
  const response = await client.query<Schema.GetCardsQuery>({
    query: Schema.GetCardsDocument,
    variables: {
      filter: params,
    },
  });

  return response.data.getCards?.items as Schema.Card[];
};

export function CardsApiProvider(props: CardsApiProviderProps) {
  const [state, setState] = useState<ProviderState>({
    cards: [],
    loading: false,
    errorcounter: 0,
    exception: null,
  });

  const { apolloClient } = useAppContext();

  const loadCards = async (query: string) => {
    setState((prevState) => ({ ...prevState, loading: true }));

    console.log('Loadcards ', query);
    console.log('aplollo', apolloClient);

    try {
      setState((prevState) => ({ ...prevState, loading: true, exception: null }));

      if (!apolloClient) throw new Error('client is not set');

      const data = (await getCards(apolloClient, { searchQuery: query })) as CardData[];

      setState((prevState) => ({
        ...prevState,
        cards: data,
        errorcounter: 0,
        loading: false,
        exception: null,
      }));
      console.log('Loaded!');
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
