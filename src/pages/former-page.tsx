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

interface MessageProps {
  message?: string;
}

export const ConfirmationMessage: React.FC<MessageProps> = ({ message }) => {
  return message ? <p className="confirmation">{message}</p> : null;
};

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
    console.log('Mounting!');
    console.log(this.context);
    console.log(this.context.formCardProvider);
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
      message: 'Card(' + newCard.uuid + ') has been saved',
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

export default FormerPage;
