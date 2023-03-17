import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryStorageProvider } from '../providers/memory-storage-provider';
import SearchBar from './searchbar';

describe('Searchbar component', () => {
  it('should render without crash', async () => {
    const memory = new MemoryStorageProvider();
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    act(() => {
      render(
        <SearchBar
          id="sb"
          localstore={memory}
          testId="sb-test"
          triggerOnLoad={true}
          onQueryChange={qcFunc}
          title={pattern}
        />
      );
    });

    await waitFor(() => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });

    expect(qcFunc).toBeCalled();
    expect(qcFunc).toBeCalledWith('', true);
  });

  it('should Trigger querychange', async () => {
    const memory = new MemoryStorageProvider();
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    act(() => {
      render(
        <SearchBar
          id="sb"
          localstore={memory}
          testId="sb-test"
          triggerOnLoad={false}
          onQueryChange={qcFunc}
          title={pattern}
        />
      );
    });

    await waitFor(() => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });

    const searchBar = screen.getByTestId('sb-test');
    expect(searchBar).toBeInTheDocument();

    act(() => fireEvent.change(searchBar, { target: { value: '12345' } }));

    expect(qcFunc).toBeCalled();
    expect(qcFunc).toBeCalledWith('12345', false);
  });

  it('should Trigger querychange via Enter', async () => {
    const memory = new MemoryStorageProvider();
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    act(() => {
      render(
        <SearchBar
          id="sb"
          localstore={memory}
          testId="sb-test"
          triggerOnLoad={false}
          onQueryChange={qcFunc}
          title={pattern}
        />
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
      expect(qcFunc).toBeCalledWith('0', false);
      expect(qcFunc).toBeCalledWith('0', true);
    });
  });
});
