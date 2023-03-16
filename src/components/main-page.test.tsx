import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import MainPage from './main-page';

describe('Main page component', () => {
  it('should render without crash', async () => {
    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText('Enter search query')).toBeInTheDocument();

      const searchBar = screen.getByTestId('search-bar-test-id');
      expect(searchBar).toBeInTheDocument();
    });
  });

  it('should search', async () => {
    const sfun = jest.fn();

    render(<MainPage onSearchHook={sfun} />);

    await waitFor(() => {
      expect(screen.getByText('Enter search query')).toBeInTheDocument();
    });

    const searchBar = screen.getByTestId('search-bar-test-id');
    expect(searchBar).toBeInTheDocument();

    fireEvent.change(searchBar, { target: { value: '12345' } });
    clickSearch();

    expect(sfun).toBeCalledWith('12345', false);
    expect(sfun).toBeCalledWith('12345', true);
  });

  const clickSearch = () => {
    const input = screen.getByRole('button', { name: 'Search' });
    expect(input).toBeInTheDocument();
    input.click();
  };
});
