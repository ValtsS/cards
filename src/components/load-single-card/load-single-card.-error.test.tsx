import { useNotifications } from '@/providers';
import { ContextValue, ProviderState } from '@/providers/card/api-provider';
import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { LoadSingleCard } from './load-single-card';

jest.mock('@/providers/card/api-provider', () => {
  const state: ProviderState = {
    cards: [],
    loading: false,
    errorcounter: 0,
    total: 2,
    limit: 275,
    offset: 0,
    exception: null,
    filteringBy: 'oldstate',
  };

  const cval: ContextValue = {
    state: state,
    getSingleCard: jest.fn().mockRejectedValue(new Error('Failed to get card')),
    loadCards: jest.fn(),
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
      setMessage: jest.fn(),
    }),
  };
});

describe('Load Single card component', () => {
  it('should handle error in loading', async () => {
    act(() => render(<LoadSingleCard uuid={'512'} />));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    const { setMessage } = useNotifications();
    expect(setMessage).toBeCalled();
    expect(setMessage).toBeCalledWith('Error caught while loading card', true);
  });
});
