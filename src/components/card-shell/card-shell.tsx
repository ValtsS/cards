import { Card } from '@/components';
import { CardData, useModalDialog } from '@/providers';
import React, { ReactElement, useCallback } from 'react';
import { LoadSingleCard } from '../load-single-card/load-single-card';
import './card-shell.css';

interface CardLoaderProps {
  data?: CardData[];
  query?: string;
  hidequery?: boolean;
  showdetails?: boolean;
}

export const CardShell = (props: CardLoaderProps): ReactElement => {
  const getQuery = (): string => {
    return props.hidequery ? '' : 'no cards found for your search query: ' + (props.query ?? '');
  };

  const found = props.data && props.data.length > 0;

  const { showDialog } = useModalDialog();

  const onclick = useCallback(async (uuid: string) => {
    showDialog(<LoadSingleCard uuid={uuid} />, {});
  }, []);

  return (
    <>
      {found && !props.hidequery ? <p className="filtertext">Filter: {props.query}</p> : ''}
      <div className="card-container">
        {found && props.data
          ? props.data.map((carddata, index) => (
              <Card card={carddata} key={'CardNr' + index.toString()} clicked={onclick} />
            ))
          : getQuery()}
      </div>
    </>
  );
};
