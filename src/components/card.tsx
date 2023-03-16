import { CardData } from 'providers/card-provider';
import React from 'react';
import './card.css';

interface CardProps {
  card: CardData;
}

class Card extends React.Component<CardProps> {
  render() {
    return <div className="card">{this.props.card.title}</div>;
  }
}

export default Card;
