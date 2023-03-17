import { CardData } from 'providers/card-provider';
import React from 'react';
import './card.css';

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
          <p className="price">{this.props.card.price}</p>
          <p className="smalltitle">{this.props.card.text}</p>
          <img src={this.props.card.minipic} className="minipic"></img>
          <p className="smalltitle">{this.props.card.addedat?.toDateString()}</p>
        </div>
      </div>
    );
  }
}

export default Card;
