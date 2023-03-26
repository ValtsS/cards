import { AppContextProvider } from '@/providers/app-context-provider';
import { CardProviderStore } from '@/providers/';
import { MemoryStorage } from '@/providers/storage';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import SearchBar from './searchbar';

// Create a mock for the CardProviderStore class
jest.mock('@/providers/', () => {
  return {
    CardProviderStore: jest.fn().mockImplementation(() => {
      return {
        loadTestData: jest.fn().mockResolvedValue([]),
      };
    }),
  };
});

describe('Searchbar component', () => {
  const memory = new MemoryStorage();

  it('should render without crash', async () => {
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    act(() => {
      render(
        <AppContextProvider
          localStoreProvider={memory}
          cardProvider={new CardProviderStore()}
          formCardProvider={new CardProviderStore()}
        >
          <SearchBar id="sb" testId="sb-test" onQueryChange={qcFunc} title={pattern} />
        </AppContextProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });

    expect(qcFunc).toBeCalledTimes(0);
    expect(memory.getItem(`searchbar_sb_lastquery`)).toBeNull();
  });

  it('should render with forced umount', async () => {
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    const memory = new MemoryStorage();

    const { unmount } = render(
      <AppContextProvider
        localStoreProvider={memory}
        cardProvider={new CardProviderStore()}
        formCardProvider={new CardProviderStore()}
      >
        <SearchBar id="sb" testId="sb-test" onQueryChange={qcFunc} title={pattern} />
      </AppContextProvider>
    );

    unmount();
    expect(memory.getItem(`searchbar_sb_lastquery`)).toBeNull();
  });

  it('should Trigger querychange', async () => {
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    act(() => {
      render(
        <AppContextProvider
          localStoreProvider={memory}
          cardProvider={new CardProviderStore()}
          formCardProvider={new CardProviderStore()}
        >
          <SearchBar id="sb" testId="sb-test" onQueryChange={qcFunc} title={pattern} />
        </AppContextProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });

    const searchBar = screen.getByTestId('sb-test');
    expect(searchBar).toBeInTheDocument();

    act(() => fireEvent.change(searchBar, { target: { value: '12345' } }));

    expect(qcFunc).toBeCalledTimes(0);
    expect(memory.getItem(`searchbar_sb_lastquery`)).toBeNull();
  });

  it('should Trigger querychange via Enter', async () => {
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    act(() => {
      render(
        <AppContextProvider
          localStoreProvider={memory}
          cardProvider={new CardProviderStore()}
          formCardProvider={new CardProviderStore()}
        >
          <SearchBar id="sb" testId="sb-test" onQueryChange={qcFunc} title={pattern} />
        </AppContextProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });

    const searchBar = screen.getByTestId('sb-test');
    expect(searchBar).toBeInTheDocument();

    act(() => {
      fireEvent.keyDown(searchBar, { key: '0', keyCode: 48 });
      fireEvent.keyUp(searchBar, { key: '0', keyCode: 48 });
      fireEvent.change(searchBar, { target: { value: '0' } });
      fireEvent.keyDown(searchBar, { key: 'Enter', keyCode: 13 });
      fireEvent.keyUp(searchBar, { key: 'Enter', keyCode: 13 });
    });

    await waitFor(() => {
      expect(qcFunc).toBeCalled();
      expect(qcFunc).toBeCalledWith('0');
      expect(memory.getItem(`searchbar_sb_lastquery`)).toBe('0');
    });
  });
});
