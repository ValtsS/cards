import CardShell from '../components/card-shell';
import { CardData } from '../providers/card-provider';
import React from 'react';
import CardCreator from '../components/card-creator';

interface FormerPageState {
  cards: CardData[];
  message?: string;
}

class FormerPage extends React.Component<object, FormerPageState> {
  constructor(props: object) {
    super(props);

    const initialState: FormerPageState = {
      cards: [],
    };
    this.state = initialState;
  }

  insert(cards: CardData[], card: CardData): CardData[] {
    const lastcardUUID = cards.length > 0 ? cards[0].uuid : -1;
    if (card.uuid != lastcardUUID) cards.unshift(card);

    return cards;
  }
  new = async (newCard: CardData) => {
    this.setState((prevState) => ({
      ...prevState,
      cards: this.insert(prevState.cards, newCard),
    }));
  };

  render() {
    return (
      <>
        <CardCreator onCardCreate={this.new} />
        <CardShell data={this.state.cards} hidequery={true} />
      </>
    );
  }
}

export default FormerPage;
