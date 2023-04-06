import React, { useCallback, useEffect } from 'react';
import { APIState } from '../api-state-indicator';
import { CardShell } from '@/components/card-shell';
import { FloatNotification } from '../float-notification';
import { Spinner } from '../spinner/spinner';
import { useNotifications } from '@/providers/notifications-provider/notifications-provider';
import { useCardsApiContext } from '@/providers/card/api-provider';

interface CardShellLoaderProps {
  query: string;
}

export const CardShellLoader = (props: CardShellLoaderProps) => {
  const { setMessage } = useNotifications();
  const { state, loadCards } = useCardsApiContext();
  const { state: notify } = useNotifications();

  const handleQueryChange = useCallback(
    async (searchQuery: string) => {
      try {
        if (state.errorcounter < 5) {
          await loadCards(searchQuery);
        } else {
          setMessage('giving up due to multiple API server errors :-( Is server down?', true);
        }
      } catch (error) {
        setMessage('API call failed', true);
      }
    },
    [loadCards, state.errorcounter, setMessage]
  );

  useEffect(() => {
    handleQueryChange(props.query);
  }, [props.query, handleQueryChange]);

  return (
    <>
      <APIState {...state} />
      <FloatNotification message={notify.message} error={notify.error} />
      {state.loading && <Spinner />}
      {state.cards && <CardShell data={state.cards} query={state.filteringBy} />}
    </>
  );
};
