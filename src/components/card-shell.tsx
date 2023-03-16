import { CardData } from 'providers/card-provider';
import React from 'react';
import Card from './card';
import './card-shell.css';

interface CardLoaderProps {
  data?: CardData[];
}

class CardShell extends React.Component<CardLoaderProps> {
  constructor(props: CardLoaderProps) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="card-container">
          {this.props.data
            ? this.props.data.map((carddata, index) => (
                <Card card={carddata} key={'CardNr' + index.toString()} />
              ))
            : 'none'}
        </div>
      </>
    );
  }
}

export default CardShell;
