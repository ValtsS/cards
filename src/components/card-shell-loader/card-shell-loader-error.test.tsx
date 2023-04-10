import { ContextValue, ProviderState, useCardsApiContext } from '@/providers/card';
import { useNotifications } from '@/providers/notifications-provider/notifications-provider';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { CardShellLoader } from './card-shell-loader';

jest.mock('@/providers/card/api-provider', () => {
  const state: ProviderState = {
    cards: [],
    loading: false,
    errorcounter: 25,
    total: 2,
    limit: 275,
    offset: 0,
    exception: null,
    filteringBy: 'oldstate',
    hasNext: false,
    hasPrevious: false,
  };

  const cval: ContextValue = {
    state: state,
    getSingleCard: jest.fn().mockImplementation(() => {
      throw new Error('Loading issue #2');
    }),
    loadCards: jest.fn().mockImplementation(() => {
      throw new Error('Loading issue #1');
    }),
  };

  return {
    ...jest.requireActual('@/providers/card/api-provider'),
    useCardsApiContext: jest.fn().mockImplementation(() => cval),
  };
});

jest.mock('@/providers/notifications-provider/notifications-provider', () => {
  return {
    ...jest.requireActual('@/providers/notifications-provider/notifications-provider'),
    useNotifications: jest.fn().mockReturnValue({
      state: {
        message: '123',
      },
      setMessage: jest.fn(),
    }),
  };
});

describe('CardShellLoader component', () => {
  it('should handle API errors with N failures', () => {
    act(() => {
      render(<CardShellLoader query="test" />);
    });
    const { setMessage } = useNotifications();
    expect(setMessage).toBeCalled();
    expect(setMessage).toBeCalledWith(
      'giving up due to multiple API server errors :-( Is server down?',
      true
    );
  });

  it('should handle other failures', () => {
    const { state } = useCardsApiContext();
    state.errorcounter = 0;
    state.loading = true;

    act(() => {
      render(<CardShellLoader query="test" />);
    });
    const { setMessage } = useNotifications();
    expect(setMessage).toBeCalled();
    expect(setMessage).toBeCalledWith('API call failed', true);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
