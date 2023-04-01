import { CardData } from '@/providers';
import { cardTestData } from '@/providers/card/card-test-data';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Card, IMGCLS_FLIP, IMGCLS_GRAY } from './card';

describe('Card component', () => {
  it.each(cardTestData)('should render the card data correctly for $title', (card) => {
    render(<Card card={card} />);
    expect(screen.getByText(card.title ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.text ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.price ?? '')).toBeInTheDocument();
  });

  const flipsGrays: CardData[] = [
    {
      uuid: 'AA',
      flipimg: false,
    },
    {
      uuid: 'BB',
      grayscale: false,
    },
    {
      uuid: 'CC',
      flipimg: true,
    },
    {
      uuid: 'DD',
      grayscale: true,
    },
    {
      uuid: 'EE',
    },
    {
      uuid: 'EE',
    },
  ];

  it.each(flipsGrays)('should render the cards flips/grays correctly $uuid', (card) => {
    render(<Card card={card} />);
    expect(screen.getByText('☆☆☆☆☆')).toBeInTheDocument();
    const image = screen.getByRole('img', { name: /full picture/i });

    expect(image).toBeInTheDocument();

    if (card.grayscale) expect(image).toHaveClass(IMGCLS_GRAY);
    else expect(image).not.toHaveClass(IMGCLS_GRAY);

    if (card.flipimg) expect(image).toHaveClass(IMGCLS_FLIP);
    else expect(image).not.toHaveClass(IMGCLS_FLIP);
  });
});
