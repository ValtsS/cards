import { render, screen } from '@testing-library/react';
import { CardData } from 'providers/card-provider';
import React from 'react';
import { CardProps } from './card';
import CardShell from './card-shell';

jest.mock('./card', () => {
  return function MockCard(props: CardProps) {
    return (
      <div className="mock-card">
        <span className="mock-card-title">{props.card.title}</span>
        <span className="mock-card-price">{props.card.price}</span>
        <span className="mock-card-text">{props.card.text}</span>
      </div>
    );
  };
});

describe('Card Shell component', () => {
  it('should not crash', () => {
    render(<CardShell data={[]} query="UUUUU" />);

    expect(screen.getByText('no cards found for your search query: UUUUU')).toBeInTheDocument();
  });
  it('should render something', () => {
    const test = new CardData();
    test.title = 'Title';
    test.price = '$100';
    test.text = 'Text';

    render(<CardShell data={[test]} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();

  });

  it('renders default message when query is undefined', () => {
    const { getByText } = render(<CardShell data={[]} query={undefined} />);
    expect(getByText('no cards found for your search query:')).toBeInTheDocument();
  });

});
