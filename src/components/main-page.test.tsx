import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LocalStorageProvider } from 'providers/local-storage-provider';
import React from 'react';
import { CardProviderStore } from '../providers/card-provider';
import MainPage from './main-page';

class MemoryStorageProvider implements LocalStorageProvider {
  private data: { [key: string]: string } = {};

  setItem(key: string, value: string): void {
    this.data[key] = value;
  }

  getItem(key: string): string | null {
    return this.data[key] || null;
  }
}

describe('Main page component', () => {
  const mockCards = new CardProviderStore() as jest.Mocked<CardProviderStore>;

  it('should render without crash', async () => {
    render(<MainPage cardProvider={mockCards} localStoreProvider={new MemoryStorageProvider()} />);
    await waitFor(() => {
      expect(screen.getByText('Enter search query')).toBeInTheDocument();

      const searchBar = screen.getByTestId('search-bar-test-id');
      expect(searchBar).toBeInTheDocument();
    });
  });

  it('should search', async () => {
    const sfun = jest.fn();

    render(
      <MainPage
        onSearchHook={sfun}
        cardProvider={mockCards}
        localStoreProvider={new MemoryStorageProvider()}
      />
    );

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
