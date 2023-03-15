import { render, screen } from '@testing-library/react';
import App from 'App';
import React from 'react';

describe('App component', () => {
  it('should render without crash', () => {
    render(<App />);
  });

  it('should catch and handle errors', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
      render(<App throwError={true} />);
    } catch {
      const errorLabel = screen.getByText(/Something went wrong/i);
      expect(errorLabel).toBeInTheDocument();
    }

    expect(spy).toHaveBeenCalledWith('error caught:', new Error('Something went wrong!!'));

    spy.mockRestore();
  });
});
