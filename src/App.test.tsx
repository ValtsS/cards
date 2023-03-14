import { render, screen } from '@testing-library/react';
import App from 'App';
import React from 'react';

describe('App component', () => {
  it('should render without crash', () => {
    render(<App />);
  });

  it('should catch and handle errors', () => {
    render(<App throwError={true} />);
    let label = screen.getByText('Something went wrong');
    expect(label).toBeInTheDocument();
  });
});
