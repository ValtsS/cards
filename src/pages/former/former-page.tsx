import { CardCreator } from '@/components/card-creator';
import { CardShell } from '@/components/card-shell';
import { CardData, useAppContext } from '@/providers';
import React, { ReactElement, useEffect, useState } from 'react';
import './former-page.css';

interface FormerPageState {
  cards: CardData[];
  message?: string;
}

interface MessageProps {
  message?: string;
}

export const ConfirmationMessage: React.FC<MessageProps> = ({ message }) => {
  return message ? <p className="confirmation">{message}</p> : null;
};

export const FormerPage = (): ReactElement => {
  const { formCardProvider } = useAppContext();

  const initialState: FormerPageState = {
    cards: [],
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      cards: formCardProvider.data,
      message: '',
    }));
  }, [formCardProvider]);

  const newCard = (newCard: CardData) => {
    setState((prevState) => ({
      ...prevState,
      cards: formCardProvider.insert(newCard),
      message: 'Card (Id = ' + newCard.uuid + ') has been saved',
    }));
  };

  return (
    <>
      <br />
      <CardCreator onCardCreate={newCard} />
      <ConfirmationMessage message={state.message} />
      <CardShell data={state.cards} hidequery={true} />
    </>
  );
};
