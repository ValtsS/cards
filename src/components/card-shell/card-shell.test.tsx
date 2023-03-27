import { CardData } from '@/providers';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { CardShell } from './card-shell';

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
