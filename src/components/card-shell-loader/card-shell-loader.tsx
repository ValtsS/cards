import React, { useCallback, useEffect, useState } from 'react';
import { APIState } from '../api-state-indicator';
import { CardShell } from '@/components/card-shell';
import { FloatNotification } from '../float-notification';
import { Spinner } from '../spinner/spinner';
import { useNotifications } from '@/providers/notifications-provider/notifications-provider';
import { SortBy, useCardsApiContext } from '@/providers/card/api-provider';
import * as Schema from '@/__generated__/graphql';

interface CardShellLoaderProps {
  query: string;
}

export const CardShellLoader = (props: CardShellLoaderProps) => {
  const { setMessage } = useNotifications();
  const { state, loadCards } = useCardsApiContext();
  const { state: notify } = useNotifications();

  const [sortByPrice, setUseSort] = useState(0);

  const handleQueryChange = useCallback(
    async (searchQuery: string) => {
      try {
        if (state.errorcounter < 5) {
          const ordering: Schema.CardSortInput[] = [];

          switch (sortByPrice % 3) {
            case 1:
              ordering.push(SortBy.Price_ASC);
              break;
            case 2:
              ordering.push(SortBy.Price_DESC);
              break;
          }

          await loadCards(searchQuery, ordering);
        } else {
          setMessage('giving up due to multiple API server errors :-( Is server down?', true);
        }
      } catch (error) {
        setMessage('API call failed', true);
      }
    },
    [loadCards, state.errorcounter, setMessage, sortByPrice]
  );

  useEffect(() => {
    handleQueryChange(props.query);
  }, [props.query, handleQueryChange]);

  return (
    <>
      <APIState {...state} />
      <button onClick={() => setUseSort((prevState) => prevState + 1)}>
        Push to sort by price!
      </button>
      <FloatNotification message={notify.message} error={notify.error} />
      {state.loading && <Spinner />}
      {state.cards && <CardShell data={state.cards} query={state.filteringBy} />}
    </>
  );
};
