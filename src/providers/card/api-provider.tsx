import * as Schema from '@/__generated__/graphql';
import { ApolloClient } from '@apollo/client';
import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useAppContext } from '../app-context-provider';
import { useNotifications } from '../shell-notifcations/shell-notifications';
import { CardData } from './card-provider';

interface ProviderState {
  cards: CardData[];
  offset?: number;
  total?: number;
  limit?: number;
  loading: boolean;
  exception: Error | null;
  errorcounter: number;
  filteringBy: string;
}

interface ContextValue {
  state: ProviderState;
  loadCards: (query: string) => Promise<void>;
  getSingleCard: (uuid: string) => Promise<CardData | null>;
}

const CardsApiContext = createContext<ContextValue>({
  state: {
    cards: [],
    loading: false,
    errorcounter: 0,
    exception: null,
    filteringBy: '',
  },
  loadCards: async () => {},
  getSingleCard: async () => null,
});

interface CardsApiProviderProps {
  children: React.ReactNode;
}

const getCards = async (
  client: ApolloClient<unknown>,
  params: Schema.CardFilterInput,
  limit: number,
  offset: number
): Promise<{ cards: CardData[]; totalcount: number }> => {
  const response = await client.query<Schema.GetCardsQuery>({
    query: Schema.GetCardsDocument,
    variables: {
      skip: offset,
      take: limit,
      filter: params,
    },
  });

  const data = response.data.getCards?.items as Schema.Card[];
  const patched: CardData[] = [];

  data.forEach((e) => {
    const { addedat, ...otherProps } = e;
    const c = new CardData();
    Object.assign(c, otherProps);
    c.addedat = new Date(addedat);
    patched.push(c);
  });

  return { cards: patched, totalcount: response.data.getCards?.totalCount ?? 0 };
};

const getCard = async (
  client: ApolloClient<unknown>,
  params: Schema.CardFilterInput
): Promise<CardData | null> => {
  const response = await client.query<Schema.GetCardQuery>({
    query: Schema.GetCardDocument,
    variables: {
      filter: params,
    },
  });

  const data = response.data.getCards?.items as Schema.Card[];
  const patched: CardData[] = [];

  data.forEach((e) => {
    const { addedat, ...otherProps } = e;
    const c = new CardData();
    Object.assign(c, otherProps);
    c.addedat = new Date(addedat);
    patched.push(c);
  });

  return patched.length > 0 ? patched[0] : null;
};

export function CardsApiProvider(props: CardsApiProviderProps) {
  const [state, setState] = useState<ProviderState>({
    cards: [],
    loading: false,
    errorcounter: 0,
    exception: null,
    filteringBy: '',
  });

  const { setMessage } = useNotifications();

  const { apolloClient } = useAppContext();

  const getSingleCard = useCallback(
    async (uuid: string): Promise<CardData | null> => {
      if (!apolloClient) throw new Error('client is not set');

      const searchparams: Schema.CardFilterInput = {
        searchQuery: '',
        uuid,
      };
      try {
        const data = await getCard(apolloClient, searchparams);
        return data;
      } catch (error) {
        setMessage((error as Error).message, true);
        return null;
      }
    },
    [apolloClient, setMessage]
  );

  const loadCards = useCallback(
    async (query: string) => {
      setState((prevState) => ({ ...prevState, loading: true }));

      console.log('Loadcards ', query);
      console.log('aplollo', apolloClient);

      const limit = 25;
      const offset = 0;

      try {
        setState((prevState) => ({ ...prevState, loading: true, exception: null, cards: [] }));

        if (!apolloClient) throw new Error('client is not set');

        const searchparams: Schema.CardFilterInput = {
          searchQuery: query,
          uuid: '',
        };

        const data = await getCards(apolloClient, searchparams, limit, offset);

        setState((prevState) => ({
          ...prevState,
          cards: data.cards,
          total: data.totalcount,
          limit,
          offset,
          errorcounter: 0,
          loading: false,
          exception: null,
          filteringBy: query,
        }));
        console.log('Loaded!');
      } catch (error) {
        if (error instanceof Error) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            errorcounter: prevState.errorcounter + 1,
            limit: limit,
            offset,
            total: 0,
            exception: error as Error,
            filteringBy: '',
          }));
          setMessage((error as Error).message, true);
        } else {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            limit: limit,
            offset,
            total: 0,
            errorcounter: prevState.errorcounter + 1,
            exception: new Error('unknown type exception'),
            filteringBy: '',
          }));
          setMessage('Unknown API server error', true);
        }
      }
    },
    [apolloClient, setMessage]
  );

  const contextValue: ContextValue = useMemo(
    () => ({
      state,
      loadCards,
      getSingleCard,
    }),
    [state, loadCards, getSingleCard]
  );

  return <CardsApiContext.Provider value={contextValue}>{props.children}</CardsApiContext.Provider>;
}

export function useCardsApiContext() {
  const store = React.useContext(CardsApiContext);
  if (!store) {
    throw new Error('useCardsApiContext must be used within a CardsApiProvider');
  }
  return store;
}
