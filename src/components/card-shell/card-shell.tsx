import { CardData } from '@/providers';
import React, { ReactElement } from 'react';
import { Card } from '@/components/card';
import './card-shell.css';

interface CardLoaderProps {
  data?: CardData[];
  query?: string;
  hidequery?: boolean;
}

export const CardShell = (props: CardLoaderProps): ReactElement => {
  const getQuery = (): string => {
    return props.hidequery ? '' : 'no cards found for your search query: ' + (props.query ?? '');
  };

  const found = props.data && props.data.length > 0;

  return (
    <>
      {found && !props.hidequery ? <p className="filtertext">Filter: {props.query}</p> : ''}
      <div className="card-container">
        {found && props.data
          ? props.data.map((carddata, index) => (
              <Card card={carddata} key={'CardNr' + index.toString()} />
            ))
          : getQuery()}
      </div>
    </>
  );
};
