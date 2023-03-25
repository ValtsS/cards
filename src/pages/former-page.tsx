import CardShell from '../components/card-shell';
import { CardData } from '../providers/card-provider';
import React from 'react';
import CardCreator from '../components/card-creator';
import './former-page.css';
import { AppContext } from '../providers/app-context-provider';

interface FormerPageState {
  cards: CardData[];
  message?: string;
}

class FormerPage extends React.Component<object, FormerPageState> {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;

  constructor(props: object) {
    super(props);

    const initialState: FormerPageState = {
      cards: [],
    };
    this.state = initialState;
  }

  componentDidMount(): void {
    this.setState((prevState) => ({
      ...prevState,
      cards: this.context.formCardProvider.data,
      message: '',
    }));
  }

  new = async (newCard: CardData) => {
    if (!this.context.formCardProvider) throw new Error('Cardprovider2 not set');

    this.setState((prevState) => ({
      ...prevState,
      cards: this.context.formCardProvider.insert(newCard),
      message: 'Card(' + newCard.uuid + ') has been saved',
    }));
  };

  render() {
    return (
      <>
        <br />
        <CardCreator onCardCreate={this.new} />
        {this.state.message && <p className="confirmation">{this.state.message}</p>}
        <CardShell data={this.state.cards} hidequery={true} />
      </>
    );
  }
}

export default FormerPage;
