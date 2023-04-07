import { ProviderState } from '@/providers';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { APIState } from './api-state-indicator';

describe('APIState', () => {
  const defaultProps: ProviderState = {
    loading: false,
    total: 113124,
    offset: 9919321,
    limit: 512313,
    cards: [],
    errorcounter: 0,
    exception: null,
    filteringBy: '',
    sortingBy: 'XX',
  };

  test('renders API state information', () => {
    render(<APIState {...defaultProps} />);
    expect(screen.getByText('API Status:')).toBeInTheDocument();
    expect(screen.getByText('Ready')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.total ?? 0)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.offset ?? 0)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.limit ?? 0)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.sortingBy ?? 0)).toBeInTheDocument();
  });

  test('displays "Loading" when loading prop is true', () => {
    render(<APIState {...defaultProps} loading={true} />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
