import { CardData } from '@/providers';
import { useCardsApiContext } from '@/providers/card/api-provider';
import { useNotifications } from '@/providers/shell-notifcations/shell-notifications';
import React, { useEffect, useState } from 'react';
import { Card } from '../card';
import Spinner from '../spinner/spinner';

export const LoadSingleCard = ({ uuid }: { uuid: string }) => {
  const { getSingleCard } = useCardsApiContext();

  const [card, setCard] = useState<CardData | null>();
  const { setMessage } = useNotifications();

  useEffect(() => {
    if (getSingleCard) {
      const promise = getSingleCard(uuid);
      promise
        .then((value) => {
          setCard(value);
        })
        .catch(() => setMessage('Error caught while loading card', true));
    }
  }, [getSingleCard, uuid, setMessage]);

  return (
    <>
      {!card && <Spinner />}
      {card && <Card card={card} />}
    </>
  );
};
