import { ContextValue, ProviderState } from '@/providers/card';
import { mockCardTestData } from '@/providers/card/card-test-data';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { CardShellLoader } from './card-shell-loader';
import { useCardsApiContext } from '@/providers/card/api-provider';

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
      const price = card.price ? '$' + card.price : '';
      expect(screen.getByText(price)).toBeInTheDocument();
    });

    expect(screen.queryAllByRole('img').length).toBe(mockCardTestData.length * 2);
  });

  it('should trigger the sorting', async () => {
    act(() => {
      render(<CardShellLoader query="test" />);
    });

    expect(screen.getByText('275')).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const { loadCards } = useCardsApiContext();

    expect(loadCards).toBeCalledTimes(1);
    expect(loadCards).toBeCalledWith('test', []);

    act(() => {
      fireEvent.click(button);
    });

    expect(loadCards).toBeCalledTimes(2);
    expect(loadCards).toBeCalledWith('test', [{ price: 'ASC' }]);

    act(() => {
      fireEvent.click(button);
    });

    expect(loadCards).toBeCalledTimes(3);
    expect(loadCards).toBeCalledWith('test', [{ price: 'DESC' }]);
  });
});
