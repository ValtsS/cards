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
  const card = props.card;

  const imgclass =
    IMGCLS_BIGPIC +
    (!card.text ? ' ' + IMGCLS_HOVER : '') +
    (card.flipimg && card.flipimg.valueOf() ? ' ' + IMGCLS_FLIP : '') +
    (card.grayscale && card.grayscale.valueOf() ? ' ' + IMGCLS_GRAY : '');

  const dateSet = card.addedat && card.addedat.getFullYear() > 0;
  const ratingSet = card.rating && card.rating > 0;
  const priceSet = Boolean(card.price);
  const miniSet = Boolean(card.minipic);

  return (
    <div className="card">
      <div className="inner">
        <div className="title">{card.title}</div>
        <img
          src={card.imageUrl}
          className={imgclass}
          alt="full picture"
          onClick={() => {
            if (props.clicked) props.clicked(card.uuid);
          }}
        ></img>

        <div className="price">
          {priceSet && <span>{card.price}</span>}
          {ratingSet && <Rating count={card.rating ?? 0} />}
        </div>

        <p className="smalltitle">{card.text}</p>
        {miniSet && <img src={card.minipic} className="minipic"></img>}
        {dateSet && <p className="date">{card.addedat?.toDateString()}</p>}
        <div className="clearfix"></div>
      </div>
    </div>
  );
};
