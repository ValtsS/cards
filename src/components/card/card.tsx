import { Rating } from '@/components/rating';
import { CardData } from '@/providers';
import React, { ReactElement } from 'react';
import './card.css';

export interface CardProps {
  card: CardData;
}

export const Card = (props: CardProps): ReactElement => {
  const imgclass =
    'bigpic' +
    (props.card.flipimg && props.card.flipimg.valueOf() ? ' flip' : '') +
    (props.card.grayscale && props.card.grayscale.valueOf() ? ' grayscale' : '');

  return (
    <div className="card">
      <div className="inner">
        <div className="title">{props.card.title}</div>
        <img src={props.card.imageUrl} className={imgclass}></img>

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
