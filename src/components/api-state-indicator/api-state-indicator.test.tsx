import { CardsResultStore, StoreStatus } from '@/slices/api/cardsApi';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { APIState } from './api-state-indicator';

describe('APIState', () => {
  const defaultProps: CardsResultStore = {
    cards: [],
    errorcounter: 0,
    limit: 25,
    offset: 125,
    query: '1234566',
    orderBy: 'priceasc',
    status: StoreStatus.succeeded,
    info: {
      totalcount: 1000,
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: true,
      },
    },
  };

  test('renders API state information', () => {
    render(<APIState {...defaultProps} />);
    expect(screen.getByText('API Status:')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.status)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.info.totalcount ?? 0)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.offset ?? 0)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.limit ?? 0)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.orderBy ?? 0)).toBeInTheDocument();
  });

  test('displays "Loading" when loading prop is true', () => {
    render(<APIState {...defaultProps} status={StoreStatus.loading} />);
    expect(screen.getByText(StoreStatus.loading)).toBeInTheDocument();
  });
});
