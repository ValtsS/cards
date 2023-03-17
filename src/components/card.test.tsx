import { render, screen } from '@testing-library/react';
import { CardData } from 'providers/card-provider';
import React from 'react';
import Card from './card';

describe('Card component', () => {
  it('should not crash', () => {
    const test = new CardData();
    test.title = 'Title';
    test.addedat = new Date(2000, 11, 15);
    test.price = '$100';
    test.text = 'Text';

    render(<Card card={test} />);

    expect(screen.getByText(test.title)).toBeInTheDocument();
    expect(screen.getByText(test.price)).toBeInTheDocument();
    expect(screen.getByText(test.text)).toBeInTheDocument();
  });
});
