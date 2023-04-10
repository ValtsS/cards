import { render } from '@testing-library/react';
import React from 'react';
import { Spinner } from './spinner';

describe('Spinner', () => {
  test('should render the Spinner component', () => {
    const { getByTestId } = render(<Spinner />);
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});
