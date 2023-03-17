import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { CardProviderStore } from '../providers/card-provider';
import { MemoryStorageProvider } from '../providers/memory-storage-provider';
import MainPage from './main-page';

// Create a mock for the CardProviderStore class
jest.mock('../providers/card-provider', () => {
  return {
    CardProviderStore: jest.fn().mockImplementation(() => {
      return {
        load: jest.fn().mockResolvedValue([]),
      };
    }),
  };
});

 describe('Main page component', () => {

  it('should render without crash', async () => {
    act(() => {
      render(
        <MainPage
          cardProvider={new CardProviderStore()}
          localStoreProvider={new MemoryStorageProvider()}
        />
      );
    });
    await waitFor(() => {
      expect(screen.getByText('Enter search query')).toBeInTheDocument();

      const searchBar = screen.getByTestId('search-bar-test-id');
      expect(searchBar).toBeInTheDocument();
    });
  });

  it('should search', async () => {
    const sfun = jest.fn();
    act(() => {
      render(
        <MainPage
          onSearchHook={sfun}
          cardProvider={new CardProviderStore()}
          localStoreProvider={new MemoryStorageProvider()}
        />
      );
    });
    await waitFor(() => {
      expect(screen.getByText('Enter search query')).toBeInTheDocument();

      const searchBar = screen.getByTestId('search-bar-test-id');
      expect(searchBar).toBeInTheDocument();
    });

    const searchBar = screen.getByTestId('search-bar-test-id');
    expect(searchBar).toBeInTheDocument();

    act(() => fireEvent.change(searchBar, { target: { value: '12345' } }) );
    clickSearch();

    await waitFor(() => {
      expect(sfun).toBeCalledWith('12345', false);
      expect(sfun).toBeCalledWith('12345', true);
    });


  });

  const clickSearch = () => {
    const input = screen.getByRole('button', { name: 'Search' });
    expect(input).toBeInTheDocument();
    act(() => input.click());

  };
});
