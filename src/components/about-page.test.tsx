import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import AboutPage from './about-page';

describe('About page component', () => {
  it('should render without crash', async () => {
    render(<AboutPage />);

    await waitFor(() => {
      expect(screen.getByText(/Fantastic about page/i)).toBeInTheDocument();
    });
  });
});
