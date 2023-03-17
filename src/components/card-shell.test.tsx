import { render, screen } from '@testing-library/react';
import { CardData } from 'providers/card-provider';
import React from 'react';
import CardShell from './card-shell';

describe('Card Shell component', () => {
  it('should not crash', () => {
    render(<CardShell data={[]} query="UUUUU" />);

    expect(screen.getByText('no cards found for your search query: UUUUU')).toBeInTheDocument();
  });
  it('should render something', () => {
    const test = new CardData();
    test.title = 'Title';
    test.addedat = new Date(2000, 11, 15);
    test.price = '$100';
    test.text = 'Text';

    render(<CardShell data={[test]} />);
  });
});
