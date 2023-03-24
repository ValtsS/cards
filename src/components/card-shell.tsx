import { CardData } from 'providers/card-provider';
import React from 'react';
import Card from './card';
import './card-shell.css';

interface CardLoaderProps {
  data?: CardData[];
  query?: string;
  hidequery?: boolean;
}

class CardShell extends React.Component<CardLoaderProps> {
  constructor(props: CardLoaderProps) {
    super(props);
  }

  render() {
    const found = this.props.data && this.props.data.length > 0;

    return (
      <>
        {found && !this.props.hidequery ? (
          <p className="filtertext">Filter: {this.props.query}</p>
        ) : (
          ''
        )}
        <div className="card-container">
          {found && this.props.data
            ? this.props.data.map((carddata, index) => (
                <Card card={carddata} key={'CardNr' + index.toString()} />
              ))
            : this.props.hidequery
            ? ''
            : 'no cards found for your search query: ' + (this.props.query ?? '')}
        </div>
      </>
    );
  }
}

export default CardShell;
