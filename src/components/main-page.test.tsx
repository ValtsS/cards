import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AppContextProvider } from 'providers/app-context-provider';
import React from 'react';
import { CardProviderStore } from '../providers/card-provider';
import { MemoryStorage } from '../providers/memory-storage';
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
        <AppContextProvider
          cardProvider={new CardProviderStore()}
          localStoreProvider={new MemoryStorage()}
        >
          <MainPage />
        </AppContextProvider>
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
        <AppContextProvider
          cardProvider={new CardProviderStore()}
          localStoreProvider={new MemoryStorage()}
        >
          <MainPage onSearch={sfun} />
        </AppContextProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Enter search query')).toBeInTheDocument();

      const searchBar = screen.getByTestId('search-bar-test-id');
      expect(searchBar).toBeInTheDocument();
    });

    const searchBar = screen.getByTestId('search-bar-test-id');
    expect(searchBar).toBeInTheDocument();

    act(() => fireEvent.change(searchBar, { target: { value: '12345' } }));
    clickSearch();

    await waitFor(() => {
      expect(sfun).toBeCalledWith('12345');
    });
  });

  it('test slow propogation due to unmount', async () => {
    const { unmount } = render(
      <AppContextProvider
        cardProvider={new CardProviderStore()}
        localStoreProvider={new MemoryStorage()}
      >
        <MainPage />
      </AppContextProvider>
    );

    unmount();
  });

  const clickSearch = () => {
    const input = screen.getByRole('button', { name: 'Search' });
    expect(input).toBeInTheDocument();
    act(() => input.click());
  };
});
