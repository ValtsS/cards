import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import ErrorPage, { unkErrorText } from './error-page';
describe('Error page component', () => {
  it('should render without crash', async () => {
    const text = 'Test error 78123';
    const testError = new Error(text);
    render(React.createElement(ErrorPage, { error: testError }));
    await waitFor(() => {
      expect(screen.getByText(new RegExp(text, 'i'))).toBeInTheDocument();
    });
  });
  it('should render with undefined error', async () => {
    render(React.createElement(ErrorPage, { error: null }));
    await waitFor(() => {
      expect(screen.getByText(new RegExp(unkErrorText, 'i'))).toBeInTheDocument();
    });
  });
});
