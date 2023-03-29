import { cardTestData } from '@/providers/card/card-test-data';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Card } from './card';

describe('Card component', () => {
  it.each(cardTestData)('should render the card data correctly for $title', (card) => {
    render(<Card card={card} />);
    expect(screen.getByText(card.title ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.text ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.price ?? '')).toBeInTheDocument();
  });
});
