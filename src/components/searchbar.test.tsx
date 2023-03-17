import { act, render, screen, waitFor } from '@testing-library/react';
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
      render(<SearchBar id='sb' localstore={memory} testId="sb-test" triggerOnLoad={false} onQueryChange={qcFunc} onSearch={scFunc} title={pattern}/>);
    });

    await waitFor(() => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });

    expect(qcFunc).toBeCalled();
    expect(scFunc).toBeCalled();

  });
});
