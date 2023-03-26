import { CardData } from '@/providers';
import React from 'react';
import { Card } from '@/components/card';
import './card-shell.css';

interface CardLoaderProps {
  data?: CardData[];
  query?: string;
  hidequery?: boolean;
}

export class CardShell extends React.Component<CardLoaderProps> {
  constructor(props: CardLoaderProps) {
    super(props);
  }

  getQuery(): string {
    return this.props.hidequery
      ? ''
      : 'no cards found for your search query: ' + (this.props.query ?? '');
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
            : this.getQuery()}
        </div>
      </>
    );
  }
}
