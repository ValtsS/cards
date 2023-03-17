import { CardData } from 'providers/card-provider';
import React from 'react';
import './card.css';
import Rating from './rating';

interface CardProps {
  card: CardData;
}

class Card extends React.Component<CardProps> {
  render() {
    return (
      <div className="card">
        <div className="inner">
          <div className="title">{this.props.card.title}</div>
          <img src={this.props.card.imageUrl} className="bigpic"></img>

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

export default Card;
