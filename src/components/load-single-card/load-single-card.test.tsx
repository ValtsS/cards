import { ContextValue, ProviderState } from '@/providers/card/api-provider';
import { mockCardTestData } from '@/providers/card/card-test-data';
import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { LoadSingleCard } from './load-single-card';

jest.mock('@/providers/card/api-provider', () => {
  const state: ProviderState = {
    cards: mockCardTestData,
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
    getSingleCard: jest.fn().mockResolvedValue(mockCardTestData[0]),
    loadCards: jest.fn(),
  };

  return {
    ...jest.requireActual('@/providers/card/api-provider'),
    useCardsApiContext: jest.fn().mockImplementation(() => cval),
  };
});

describe('Load Single card component', () => {
  it('should not crash and load a card', async () => {
    act(() => render(<LoadSingleCard uuid={'512'} />));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const card = mockCardTestData[0];

    expect(screen.getByText(card.title ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.text ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.price ?? '')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(2);
  });
});
