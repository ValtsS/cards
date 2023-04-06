import { CardData } from '@/providers';
import { cardTestData } from '@/providers/card/card-test-data';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Card, IMGCLS_FLIP, IMGCLS_GRAY } from './card';

describe('Card component', () => {
  it.each(cardTestData)('should render the card data correctly for $title', (card) => {
    render(<Card card={card} />);
    expect(screen.getByText(card.title ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.text ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.price ?? '')).toBeInTheDocument();
  });

  it.each(cardTestData)('should test click', (card) => {
    const fn = jest.fn();

    render(<Card card={card} clicked={fn} />);
    expect(screen.getByText(card.title ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.text ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.price ?? '')).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /full picture/i });
    expect(image).toBeInTheDocument();

    fireEvent.click(image);

    expect(fn).toBeCalledTimes(1);
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
      rating: 0,
    },
    {
      uuid: 'EE',
      rating: 3,
    },
  ];

  it.each(flipsGrays)('should render the cards flips/grays correctly $uuid', (card) => {
    render(<Card card={card} />);

    const image = screen.getByRole('img', { name: /full picture/i });
    expect(image).toBeInTheDocument();

    if (card.rating) {
      expect(screen.getByText('★'.repeat(card.rating ?? 0))).toBeInTheDocument();
      expect(screen.getByText('☆'.repeat(5 - (card.rating ?? 0)))).toBeInTheDocument();
    } else {
      expect(screen.queryByText('☆'.repeat(5))).not.toBeInTheDocument();
    }

    if (card.grayscale) expect(image).toHaveClass(IMGCLS_GRAY);
    else expect(image).not.toHaveClass(IMGCLS_GRAY);

    if (card.flipimg) expect(image).toHaveClass(IMGCLS_FLIP);
    else expect(image).not.toHaveClass(IMGCLS_FLIP);
  });
});
