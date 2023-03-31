import { fireEvent, screen, render, act } from '@testing-library/react';
import React from 'react';
import { TestHelper } from './input-test-helper';

describe('TestHelper', () => {
  it('renders with error and submits form unsuccessfully', async () => {
    act(() => {
      render(<TestHelper />);
    });

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'BAD' } });

    // Enter value into input
    const submit = screen.getByRole('button');

    expect(submit).toBeInTheDocument();

    fireEvent.click(submit);

    // wait for the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('BAD')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'GOOD' } });

    fireEvent.click(submit);

    // wait for the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.queryByText('BAD')).not.toBeInTheDocument();
    expect(screen.queryByText('GOOD')).not.toBeInTheDocument();
  });
});
