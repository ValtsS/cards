import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AppContextProvider } from 'providers/app-context-provider';
import { CardProviderStore } from 'providers/card-provider';
import React from 'react';
import { MemoryStorage } from '../providers/memory-storage';
import SearchBar from './searchbar';

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

describe('Searchbar component', () => {
  const memory = new MemoryStorage();

  it('should render without crash', async () => {
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    act(() => {
      render(
        <AppContextProvider localStoreProvider={memory} cardProvider={new CardProviderStore()}>
          <SearchBar
            id="sb"
            testId="sb-test"
            triggerOnLoad={true}
            onQueryChange={qcFunc}
            title={pattern}
          />
        </AppContextProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });

    expect(qcFunc).toBeCalled();
    expect(qcFunc).toBeCalledWith('');
  });

  it('should Trigger querychange', async () => {
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    act(() => {
      render(
        <AppContextProvider localStoreProvider={memory} cardProvider={new CardProviderStore()}>
          <SearchBar
            id="sb"
            testId="sb-test"
            triggerOnLoad={false}
            onQueryChange={qcFunc}
            title={pattern}
          />
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
  });

  it('should Trigger querychange via Enter', async () => {
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    act(() => {
      render(
        <AppContextProvider localStoreProvider={memory} cardProvider={new CardProviderStore()}>
          <SearchBar
            id="sb"
            testId="sb-test"
            triggerOnLoad={true}
            onQueryChange={qcFunc}
            title={pattern}
          />
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
    });
  });

  test('does not display input field when context is not ready', () => {
    const { queryByTestId } = render(
      <SearchBar id="test" onQueryChange={() => {}} triggerOnLoad={true} />
    );

    // Assert that input field is not displayed
    expect(queryByTestId('search-input')).not.toBeInTheDocument();
  });
});
