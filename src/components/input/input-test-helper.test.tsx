import { fireEvent, screen, render, act } from '@testing-library/react';
import React from 'react';
import { TestHelper } from './input-test-helper';

describe('TestHelper', () => {
  it('renders decorator with error, corrects and submits form successfully', async () => {
    act(() => {
      render(<TestHelper mode="decorator" />);
    });

    expect(screen.getByText('decorator')).toBeInTheDocument();

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

    expect(screen.getByText('[BAD]')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'GOOD' } });

    fireEvent.click(submit);

    // wait for the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.queryByText('[BAD]')).not.toBeInTheDocument();
    expect(screen.queryByText('[GOOD]')).not.toBeInTheDocument();
  });

  it('renders radio with error, corrects and submits form successfully', async () => {
    act(() => {
      render(<TestHelper mode="radio" />);
    });

    expect(screen.getByText('radio')).toBeInTheDocument();

    const orientation = screen.queryAllByRole('radio');
    expect(orientation.length).toBe(2);
    fireEvent.click(orientation[1]);

    // Enter value into input
    const submit = screen.getByRole('button');

    expect(submit).toBeInTheDocument();

    expect(screen.queryByText('[BAD]')).not.toBeInTheDocument();

    fireEvent.click(submit);

    // wait for the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('[BAD]')).toBeInTheDocument();

    fireEvent.click(orientation[0]);
    fireEvent.click(submit);

    // wait for the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.queryByText('[BAD]')).not.toBeInTheDocument();
    expect(screen.queryByText('[GOOD]')).not.toBeInTheDocument();
  });

  it('renders select with error, corrects and submits form successfully', async () => {
    act(() => {
      render(<TestHelper mode="select" />);
    });

    expect(screen.getByText('select')).toBeInTheDocument();

    const ratingcontrol = screen.getByRole('combobox');
    fireEvent.change(ratingcontrol, { target: { value: 'BAD' } });

    // Enter value into input
    const submit = screen.getByRole('button');

    expect(submit).toBeInTheDocument();

    expect(screen.queryByText('[BAD]')).not.toBeInTheDocument();

    fireEvent.click(submit);

    // wait for the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('[BAD]')).toBeInTheDocument();

    fireEvent.change(ratingcontrol, { target: { value: 'GOOD' } });
    fireEvent.click(submit);

    // wait for the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.queryByText('[BAD]')).not.toBeInTheDocument();
    expect(screen.queryByText('[GOOD]')).not.toBeInTheDocument();
  });
});
