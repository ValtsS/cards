import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { AboutPage } from './about-page';
import { setupStore } from '@/store';
import { Provider } from 'react-redux';

describe('About page component', () => {
  it('should render without crash', async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <AboutPage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Fantastic about page/i)).toBeInTheDocument();
    });
  });
});
