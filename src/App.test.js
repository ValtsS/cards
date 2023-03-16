import { render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import React from 'react';
describe('App component', () => {
  it('should render without crash', () => {
    render(React.createElement(App, null));
  });
  it('should catch and handle errors', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    try {
      render(React.createElement(App, { throwError: true }));
    } catch {}
    const error_text = 'Something went wrong!!';
    expect(spy).toHaveBeenCalledWith('error caught:', new Error(error_text));
    await waitFor(() => {
      expect(screen.getByText(new RegExp(error_text, 'i'))).toBeInTheDocument();
    });
    spy.mockRestore();
  });
});
