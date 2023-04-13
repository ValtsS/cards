import * as Schema from '@/__generated__/graphql';
import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useAppContext } from '../app-context-provider';
import { useNotifications } from '../notifications-provider/notifications-provider';
import { getCard, getCards } from './api-client';
import { CardData } from './card-data';

export interface ProviderState {
  cards: CardData[];
  offset?: number;
  total?: number;
  limit?: number;
  loading: boolean;
  exception: Error | null;
  errorcounter: number;
  filteringBy: string;
  sortingBy?: string;
  hasNext: boolean;
  hasPrevious: boolean;
  pageSize?: number;
}

export class SortBy {
  public static Price_ASC: Schema.CardSortInput = {
    price: Schema.SortEnumType.Asc,
  };

  public static Price_DESC: Schema.CardSortInput = {
    price: Schema.SortEnumType.Desc,
  };

  public static getSortingStr(ordering: Schema.CardSortInput[]): string[] {
    const results: string[] = [];

    ordering.forEach((o) => {
      let str = '';

      switch (o) {
        case SortBy.Price_ASC:
          str = '↑Price';
          break;

        case SortBy.Price_DESC:
          str = '↓Price';
          break;
      }

      results.push(str);
    });

    return results;
  }
}

export interface ContextValue {
  state: ProviderState;
  loadCards: (query: string, offset: number, ordering: Schema.CardSortInput[]) => Promise<void>;
  getSingleCard: (uuid: string) => Promise<CardData | null>;
}

const CardsApiContext = createContext<ContextValue>({
  state: {
    cards: [],
    loading: false,
    errorcounter: 0,
    exception: null,
    filteringBy: '',
    hasNext: false,
    hasPrevious: false,
  },
  loadCards: async () => {},
  getSingleCard: async () => null,
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
    filteringBy: '',
    hasNext: false,
    hasPrevious: false,
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
        setMessage((error as Error).message ?? 'Unknown API Error', true);
        return null;
      }
    },
    [apolloClient, setMessage]
  );

  const loadCards = useCallback(
    async (query: string, offset: number, ordering: Schema.CardSortInput[] = []) => {
      setState((prevState) => ({ ...prevState, loading: true }));

      const limit = 25;

      try {
        setState((prevState) => ({ ...prevState, loading: true, exception: null, cards: [] }));

        if (!apolloClient) throw new Error('client is not set');

        const searchparams: Schema.CardFilterInput = {
          searchQuery: query,
          uuid: '',
        };

        const order_strings = SortBy.getSortingStr(ordering).join(', ');

        const data = await getCards(apolloClient, searchparams, limit, offset, ordering);

        setState((prevState) => ({
          ...prevState,
          cards: data.cards,
          total: data.info.totalcount,
          limit,
          offset,
          errorcounter: 0,
          loading: false,
          exception: null,
          filteringBy: query,
          sortingBy: order_strings,
          pageSize: limit,
          hasNext: data.info.pageInfo?.hasNextPage ?? false,
          hasPrevious: data.info.pageInfo?.hasPreviousPage ?? false,
        }));
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
            hasNext: false,
            hasPrevious: false,
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
            hasNext: false,
            hasPrevious: false,
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
