import { Rating } from '@/components/rating';
import { CardData } from '@/providers';
import React from 'react';
import './card.css';

export interface CardProps {
  card: CardData;
}

export class Card extends React.Component<CardProps> {
  render() {
    const imgclass =
      'bigpic' +
      (this.props.card.flipimg && this.props.card.flipimg.valueOf() ? ' flip' : '') +
      (this.props.card.grayscale && this.props.card.grayscale.valueOf() ? ' grayscale' : '');
    return (
      <div className="card">
        <div className="inner">
          <div className="title">{this.props.card.title}</div>
          <img src={this.props.card.imageUrl} className={imgclass}></img>

          <div className="price">
            <span>{this.props.card.price}</span>
            <Rating count={this.props.card.rating ?? 0} />
          </div>

          <p className="smalltitle">{this.props.card.text}</p>
          <img src={this.props.card.minipic} className="minipic"></img>
          <p className="date">{this.props.card.addedat?.toDateString()}</p>
        </div>
      </div>
    );
  }
}
