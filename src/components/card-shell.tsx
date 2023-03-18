import { CardData } from 'providers/card-provider';
import React from 'react';
import Card from './card';
import './card-shell.css';

interface CardLoaderProps {
  data?: CardData[];
  query?: string;
}

class CardShell extends React.Component<CardLoaderProps> {
  constructor(props: CardLoaderProps) {
    super(props);
  }

  render() {
    return (
      <>
        {(this.props.query ?? '').length > 0 ? (
          <p className="filtertext">Filter: {this.props.query}</p>
        ) : (
          ''
        )}
        <div className="card-container">
          {this.props.data && this.props.data.length > 0
            ? this.props.data.map((carddata, index) => (
                <Card card={carddata} key={'CardNr' + index.toString()} />
              ))
            : 'no cards found for your search query: ' + (this.props.query ?? '')}
        </div>
      </>
    );
  }
}

export default CardShell;
