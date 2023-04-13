import * as Schema from '@/__generated__/graphql';
import { CardShell } from '@/components/card-shell';
import { useAppContext } from '@/providers';
import { SortBy } from '@/providers/card/api-provider';
import { useNotifications } from '@/providers/notifications-provider/notifications-provider';
import { StoreStatus, fetchCards, fetchParams, selectApiCardsData } from '@/slices/api/cardsApi';
import { useAppDispatch } from '@/store';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { APIState } from '../api-state-indicator';
import { FloatNotification } from '../float-notification';
import { Spinner } from '../spinner/spinner';
import './card-shell-loader.css';

interface CardShellLoaderProps {
  query: string;
}

export const CardShellLoader = (props: CardShellLoaderProps) => {
  const pageSize = 25;

  const dispatch = useAppDispatch();
  const state = useSelector(selectApiCardsData);
  const { state: notify, setMessage } = useNotifications();
  const { apolloClient } = useAppContext();

  const [sortByPrice, setUseSort] = useState(0);
  const [offset, setOffset] = useState(0);

  const handleQueryChange = useCallback(
    async (searchQuery: string, offset: number) => {
      try {
        if (!apolloClient) return;
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
          setOffset(offset);

          const params: fetchParams = {
            client: apolloClient,
            limit: pageSize,
            offset,
            order: ordering,
            params: {
              uuid: '',
              searchQuery,
            },
          };

          dispatch(fetchCards(params))
            .unwrap()
            .catch((rejectedValueOrSerializedError) => {
              setMessage(
                'Error caught while loading card: ' + (rejectedValueOrSerializedError ?? ''),
                true
              );
            });
        } else {
          setMessage('giving up due to multiple API server errors :-( Is server down?', true);
        }
      } catch (error) {
        setMessage('API call failed', true);
      }
    },
    [apolloClient, state.errorcounter, setMessage, sortByPrice, setOffset, dispatch]
  );

  const goNext = () => {
    console.log('NEXT!');
    handleQueryChange(props.query, offset + 25);
  };
  const goPrev = () => {
    console.log('PREV!');
    handleQueryChange(props.query, offset - 25);
  };

  useEffect(() => {
    handleQueryChange(props.query, 0);
  }, [props.query, handleQueryChange]);

  const pageInfo = state.info.pageInfo;

  return (
    <>
      <APIState {...state} />
      <span className="buttonland">
        <button onClick={() => setUseSort((prevState) => prevState + 1)}>
          Push to sort by price!
        </button>
        <button disabled={!pageInfo?.hasPreviousPage} onClick={goPrev}>
          &#x00AB;
        </button>
        <button disabled={!pageInfo?.hasNextPage} onClick={goNext}>
          &#x00BB;
        </button>
      </span>
      <FloatNotification message={notify.message} error={notify.error} />
      {state.status == StoreStatus.loading && <Spinner />}
      {state.cards && <CardShell data={state.cards} query={state.query} showdetails={true} />}
    </>
  );
};
