import { render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import ThrowsError from 'components/throws-error';
import React from 'react';

describe('App component', () => {
  const errorText = 'Something went wrong!!';

  it('should render without crash', async () => {
    render(
      <App>
        <div>Test text</div>
      </App>
    );

    await waitFor(() => {
      expect(screen.getByText('Test text')).toBeInTheDocument();
    });
  });

  it('should catch and handle errors', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <App>
        <ThrowsError />
      </App>
    );

    expect(spy).toHaveBeenCalledWith('error caught: ', new Error(errorText));

    await waitFor(() => {
      expect(screen.getByText(new RegExp(errorText, 'i'))).toBeInTheDocument();
    });

    spy.mockRestore();
  });
});
