import { renderWithProviders } from '@/../__mocks__/test-utils';
import { AppStore, setupStore } from '@/store';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { SearchBar } from './searchbar';

describe('Searchbar component', () => {
  let store: AppStore;
  let qcFunc: typeof jest.fn;

  const pattern = 'sweetsearch';
  const expectedKey = 'searchbar_sb_lastquery';

  beforeEach(() => {
    store = setupStore();
    qcFunc = jest.fn();
  });

  const TestRender = async () => {
    act(() => {
      renderWithProviders(
        <SearchBar id="sb" testId="sb-test" onQueryChange={qcFunc} title={pattern} />,
        { store }
      );
    });

    await waitFor(() => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });
  };

  it('should render without crash', async () => {
    TestRender();
    expect(qcFunc).toBeCalledTimes(0);
    const updatedState = store.getState();
    expect(updatedState.searchBar.query[expectedKey]).toBeUndefined();
  });

  it('should render with forced umount', async () => {
    const qcFunc = jest.fn();
    const pattern = 'sweetsearch';

    const { unmount } = renderWithProviders(
      <SearchBar id="sb" testId="sb-test" onQueryChange={qcFunc} title={pattern} />
    );

    unmount();
    const updatedState = store.getState();
    expect(updatedState.searchBar.query[expectedKey]).toBeUndefined();
  });

  it('should Trigger querychange', async () => {
    TestRender();

    const searchBar = screen.getByTestId('sb-test');
    expect(searchBar).toBeInTheDocument();

    act(() => fireEvent.change(searchBar, { target: { value: '12345' } }));

    expect(qcFunc).toBeCalledTimes(0);
    const updatedState = store.getState();
    expect(updatedState.searchBar.query[expectedKey]).toBe('12345');

    act(() => {
      fireEvent.keyDown(searchBar, { key: 'Enter', keyCode: 13 });
      fireEvent.keyUp(searchBar, { key: 'Enter', keyCode: 13 });
    });

    await waitFor(() => {
      expect(qcFunc).toBeCalled();
      expect(qcFunc).toBeCalledWith('12345');
    });
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
      const updatedState = store.getState();
      expect(updatedState.searchBar.query[expectedKey]).toBe('0');
    });
  });
});
