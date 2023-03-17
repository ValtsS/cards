import { render, screen } from '@testing-library/react';
import React from 'react';
import Rating from './rating';

describe('Rating component', () => {
  it('should display the correct number of stars based on the count prop', () => {
    render(<Rating count={3} />);
    const fullStars = screen.getByText('★★★');
    const emptyStars = screen.getByText('☆☆');

    expect(fullStars).toBeInTheDocument();
    expect(emptyStars).toBeInTheDocument();
  });
});
