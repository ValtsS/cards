import { CardProviderStore, MemoryStorage } from '@/providers';
import { AppContextProvider } from '@/providers/app-context-provider';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { SearchBar } from './searchbar';

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

describe('Searchbar component', () => {
  let memory: MemoryStorage;
  let qcFunc: typeof jest.fn;

  const pattern = 'sweetsearch';

  beforeEach(() => {
    memory = new MemoryStorage();
    qcFunc = jest.fn();
  });

  const TestRender = async () => {
    act(() => {
      render(
        <AppContextProvider localStoreProvider={memory} apolloClient={null}>
          <SearchBar id="sb" testId="sb-test" onQueryChange={qcFunc} title={pattern} />
        </AppContextProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });
  };

  it('should render without crash', async () => {
    TestRender();

    expect(qcFunc).toBeCalledTimes(0);
    expect(memory.getItem(`searchbar_sb_lastquery`)).toBeNull();
  });

  it('should render with forced umount', async () => {
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    const memory = new MemoryStorage();

    const { unmount } = render(
      <AppContextProvider localStoreProvider={memory} apolloClient={null}>
        <SearchBar id="sb" testId="sb-test" onQueryChange={qcFunc} title={pattern} />
      </AppContextProvider>
    );

    unmount();
    expect(memory.getItem(`searchbar_sb_lastquery`)).toBeNull();
  });

  it('should Trigger querychange', async () => {
    TestRender();

    const searchBar = screen.getByTestId('sb-test');
    expect(searchBar).toBeInTheDocument();

    act(() => fireEvent.change(searchBar, { target: { value: '12345' } }));

    expect(qcFunc).toBeCalledTimes(0);
    expect(memory.getItem(`searchbar_sb_lastquery`)).toBeNull();
  });

  it('should Trigger querychange via Enter', async () => {
    TestRender();

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
