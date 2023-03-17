import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryStorageProvider } from '../providers/memory-storage-provider';
import SearchBar from './searchbar';

describe('Searchbar component', () => {
  it('should render without crash', async () => {
    var memory = new MemoryStorageProvider();
    const qcFunc = jest.fn();
    const scFunc = jest.fn();
    const pattern = 'sweetsearch';

    act(() => {
      render(
        <SearchBar
          id="sb"
          localstore={memory}
          testId="sb-test"
          triggerOnLoad={true}
          onQueryChange={qcFunc}
          onSearch={scFunc}
          title={pattern}
        />
      );
    });

    await waitFor(() => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });

    expect(scFunc).toBeCalled();
  });

  it('should Trigger querychange', async () => {
    var memory = new MemoryStorageProvider();
    const qcFunc = jest.fn();
    const scFunc = jest.fn();
    const pattern = 'sweetsearch';

    act(() => {
      render(
        <SearchBar
          id="sb"
          localstore={memory}
          testId="sb-test"
          triggerOnLoad={false}
          onQueryChange={qcFunc}
          onSearch={scFunc}
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
  });


});
