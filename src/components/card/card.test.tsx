import { CardData } from '@/providers';
import { mockCardTestData } from '@/../__mocks__/card-test-data';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Card, IMGCLS_FLIP, IMGCLS_GRAY } from './card';

describe('Card component', () => {
  it.each(mockCardTestData)('should render the card data correctly for $title', (card) => {
    render(<Card card={card} />);
    expect(screen.getByText(card.title ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.text ?? '')).toBeInTheDocument();
    const price = card.price ? '$' + card.price : '';
    expect(screen.getByText(price)).toBeInTheDocument();
  });

  it.each(mockCardTestData)('should test click', (card) => {
    const fn = jest.fn();

    render(<Card card={card} clicked={fn} />);
    expect(screen.getByText(card.title ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.text ?? '')).toBeInTheDocument();

    const price = card.price ? '$' + card.price : '';
    expect(screen.getByText(price)).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /full picture/i });
    expect(image).toBeInTheDocument();

    fireEvent.click(image);

    expect(fn).toBeCalledTimes(1);
  });

  const flipsGrays: CardData[] = [
    {
      uuid: 'AA',
      flipimg: false,
      addedat: undefined,
    },
    {
      uuid: 'BB',
      grayscale: false,
      addedat: undefined,
    },
    {
      uuid: 'CC',
      flipimg: true,
      addedat: undefined,
    },
    {
      uuid: 'DD',
      grayscale: true,
      addedat: undefined,
    },
    {
      uuid: 'EE',
      rating: 0,
      addedat: undefined,
    },
    {
      uuid: 'EE',
      rating: 3,
      addedat: undefined,
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
