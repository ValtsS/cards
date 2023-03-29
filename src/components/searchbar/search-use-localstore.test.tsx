import { useAppContext } from '@/providers';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useLocalStore } from './searchbar-use-localstore';

jest.mock('@/providers');

describe('useLocalStore', () => {
  const key = 'test-key';
  const value = 'test-value';

  const localStoreMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({ localStore: localStoreMock });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should load query from local storage on mount', () => {
    localStoreMock.getItem.mockReturnValue(value);

    const { result } = renderHook(() => useLocalStore(key));

    expect(result.current.state.query).toEqual(value);
  });

  it('should save query to local storage when search is triggered', () => {
    const { result } = renderHook(() => useLocalStore(key));

    act(() => {
      result.current.handleChange(value, true);
    });

    expect(localStoreMock.setItem).toHaveBeenCalledWith(key, value);
  });

  it('should update query state and return new value when handleChange is called', () => {
    const { result } = renderHook(() => useLocalStore(key));

    let newState: string = '';
    act(() => {
      newState = result.current.handleChange(value, false);
    });

    expect(result.current.state.query).toEqual(value);
    expect(newState).toEqual(value);
  });

  it('should update query state and return new value when search is triggered', () => {
    const { result } = renderHook(() => useLocalStore(key));

    let newState: string = '';
    act(() => {
      newState = result.current.handleChange(value, true);
    });

    expect(result.current.state.query).toEqual(value);
    expect(newState).toEqual(value);
  });
});
