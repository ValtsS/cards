import { render, screen } from '@testing-library/react';
import { CardData } from 'providers/card-provider';
import React from 'react';
import Card from './card';

describe('Card component', () => {
  it('should not crash', () => {
    const test: CardData[] = [
      {
        uuid: '9999999X',
        title: 'Luxury Suite at Marriott',
        imageUrl: '',
        text: 'Experience the ultimate comfort and relaxation in our spacious luxury suite at Marriott.',
        price: '$800',
        addedat: new Date('2024-06-11'),
        minipic: '',
      },
      {
        uuid: '9999999Y',
        title: 'Standard Room at Hilton',
        imageUrl: '',
        text: 'Enjoy a comfortable stay in our standard room at Hilton, perfect for business or leisure.',
        price: '$250',
        addedat: new Date('2024-03-05'),
        minipic: '',
        grayscale: true,
        flipimg: true,
        rating: 3,
      },
    ];

    test.forEach(function (card: CardData) {
      render(<Card card={card} />);
      expect(screen.getByText(card.title ?? '')).toBeInTheDocument();
      expect(screen.getByText(card.text ?? '')).toBeInTheDocument();
      expect(screen.getByText(card.price ?? '')).toBeInTheDocument();
    });
  });
});
