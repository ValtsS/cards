import { Rating } from '@/components';
import { CardData } from '@/providers';
import React, { ReactElement } from 'react';
import './card.css';

export interface CardProps {
  card: CardData;
  clicked?: (uuid: string) => void;
}

export const IMGCLS_FLIP = 'flip';
export const IMGCLS_GRAY = 'grayscale';
export const IMGCLS_BIGPIC = 'bigpic';
export const IMGCLS_HOVER = 'bigpichover';

export const Card = (props: CardProps): ReactElement => {
  const imgclass =
    IMGCLS_BIGPIC +
    (!props.card.text ? ' ' + IMGCLS_HOVER : '') +
    (props.card.flipimg && props.card.flipimg.valueOf() ? ' ' + IMGCLS_FLIP : '') +
    (props.card.grayscale && props.card.grayscale.valueOf() ? ' ' + IMGCLS_GRAY : '');

  return (
    <div className="card">
      <div className="inner">
        <div className="title">{props.card.title}</div>
        <img
          src={props.card.imageUrl}
          className={imgclass}
          alt="full picture"
          onClick={() => {
            if (props.clicked) props.clicked(props.card.uuid);
          }}
        ></img>

        <div className="price">
          <span>{props.card.price}</span>
          <Rating count={props.card.rating ?? 0} />
        </div>

        <p className="smalltitle">{props.card.text}</p>
        <img src={props.card.minipic} className="minipic"></img>
        <p className="date">{props.card.addedat?.toDateString()}</p>
      </div>
    </div>
  );
};
