import { ContextValue, ProviderState } from '@/providers/card';
import { mockCardTestData } from '@/providers/card/card-test-data';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { CardShellLoader } from './card-shell-loader';

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
    getSingleCard: jest.fn(),
    loadCards: jest.fn(),
  };

  return {
    ...jest.requireActual('@/providers/card/api-provider'),
    useCardsApiContext: jest.fn().mockImplementation(() => cval),
  };
});

describe('CardShellLoader component', () => {
  it('should return the data', () => {
    act(() => {
      render(<CardShellLoader query="test" />);
    });

    expect(screen.getByText('275')).toBeInTheDocument();

    mockCardTestData.forEach((card) => {
      expect(screen.getByText(card.title ?? '')).toBeInTheDocument();
      expect(screen.getByText(card.price ?? '')).toBeInTheDocument();
    });

    expect(screen.queryAllByRole('img').length).toBe(mockCardTestData.length * 2);
  });
});
