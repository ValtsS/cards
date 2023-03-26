import React from 'react';
import CardCreator from '../../components/card-creator';
import CardShell from '../../components/card-shell';
import { AppContext } from '../../providers/app-context-provider';
import { CardData } from '../../providers/card-provider';
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

export class FormerPage extends React.Component<object, FormerPageState> {
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
    if (!this.context.formCardProvider) throw new Error('formCardProvider not set');
    this.setState((prevState) => ({
      ...prevState,
      cards: this.context.formCardProvider.data,
      message: '',
    }));
  }

  new = (newCard: CardData) => {
    this.setState((prevState) => ({
      ...prevState,
      cards: this.context.formCardProvider.insert(newCard),
      message: 'Card (Id = ' + newCard.uuid + ') has been saved',
    }));
  };

  render() {
    return (
      <>
        <br />
        <CardCreator onCardCreate={this.new} />
        <ConfirmationMessage message={this.state.message} />
        <CardShell data={this.state.cards} hidequery={true} />
      </>
    );
  }
}
