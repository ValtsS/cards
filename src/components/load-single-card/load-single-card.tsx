import * as Schema from '@/__generated__/graphql';
import { useAppContext } from '@/providers';
import { useNotifications } from '@/providers/notifications-provider/notifications-provider';
import { fetchCard, selectApiCardData } from '@/slices/api/cardApi';
import { useAppDispatch } from '@/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../card';
import { Spinner } from '../spinner/spinner';

export const LoadSingleCard = ({ uuid }: { uuid: string }) => {
  const dispatch = useAppDispatch();
  const card = useSelector(selectApiCardData).card;
  const { setMessage } = useNotifications();
  const { apolloClient } = useAppContext();

  useEffect(() => {
    if (apolloClient) {
      const params: Schema.CardFilterInput = {
        uuid,
        searchQuery: '',
      };

      dispatch(
        fetchCard({
          client: apolloClient,
          params,
        })
      )
        .unwrap()
        .catch((rejectedValueOrSerializedError) => {
          setMessage(
            'Error caught while loading card: ' + (rejectedValueOrSerializedError ?? ''),
            true
          );
        });
    }
  }, [uuid, setMessage, apolloClient, dispatch]);

  return (
    <>
      {!card && <Spinner />}
      {card && <Card card={card} />}
    </>
  );
};
