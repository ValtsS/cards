import { renderWithProviders } from '@/../__mocks__/test-utils';
import { AppContextProvider, MemoryStorage } from '@/providers';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MainPage } from './main-page';

// Create a mock for the CardProviderStore class
jest.mock('@/providers', () => {
  const MockCardProviderStore = jest.fn().mockImplementation(() => {
    return {
      loadTestData: jest.fn().mockResolvedValue([]),
    };
  });

  return {
    ...jest.requireActual('@/providers'),
    CardProviderStore: MockCardProviderStore,
  };
});

describe('Main page component', () => {
  it('should render without crash', async () => {
    act(() => {
      renderWithProviders(
        <AppContextProvider apolloClient={null} localStoreProvider={new MemoryStorage()}>
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
      renderWithProviders(
        <AppContextProvider apolloClient={null} localStoreProvider={new MemoryStorage()}>
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
    const { unmount } = renderWithProviders(
      <AppContextProvider localStoreProvider={new MemoryStorage()} apolloClient={null}>
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
