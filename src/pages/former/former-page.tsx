import { CardCreator } from '@/components/card-creator';
import { CardShell } from '@/components/card-shell';
import { CardData } from '@/providers';
import { insertCard, selectCardData } from '@/slices/card/cardSlice';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './former-page.css';

interface FormerPageState {
  message?: string;
}

interface MessageProps {
  message?: string;
}

export const ConfirmationMessage = ({ message }: MessageProps) => {
  return message ? <p className="confirmation">{message}</p> : null;
};

export const FormerPage = (): ReactElement => {
  const cardslist = useSelector(selectCardData);
  const dispatch = useDispatch();

  const initialState: FormerPageState = {};

  const [state, setState] = useState(initialState);

  const newCard = (newCard: CardData) => {
    const cardDataObject = { ...newCard, addedat: newCard.addedat };
    dispatch(insertCard(cardDataObject));
    setState((prevState) => ({
      ...prevState,
      message: 'Card (Id = ' + newCard.uuid + ') has been saved',
    }));
  };

  return (
    <>
      <br />
      <CardCreator onCardCreate={newCard} />
      <ConfirmationMessage message={state.message} />
      <CardShell data={cardslist} hidequery={true} />
    </>
  );
};
