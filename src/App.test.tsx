import { render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import ThrowsError from 'components/throws-error';
import React from 'react';

describe('App component', () => {
  const error_text = 'Something went wrong!!';

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

    try {
      render(
        <App>
          <ThrowsError />
        </App>
      );
    } catch {}

    expect(spy).toHaveBeenCalledWith('error caught: ', new Error(error_text));

    await waitFor(() => {
      expect(screen.getByText(new RegExp(error_text, 'i'))).toBeInTheDocument();
    });

    spy.mockRestore();
  });
});
