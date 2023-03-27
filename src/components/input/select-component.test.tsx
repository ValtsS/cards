import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import { SelectWithDecorator } from './select-component';

describe('SelectWithDecorator', () => {
  it('renders with options and label', () => {
    const ref = createRef<HTMLSelectElement>();
    const values = ['value1', 'value2', 'value3'];
    const name = 'test-select';
    const title = 'Test Select';
    render(<SelectWithDecorator name={name} title={title} values={values} ref={ref} />);

    const opts = screen.queryAllByRole('option');
    expect(opts.length).toBe(3);

    const combo = screen.getByRole('combobox');
    expect(combo).toBeInTheDocument();

    fireEvent.change(combo, { target: { value: values[2] } });
    expect(ref.current?.value).toBe(values[2]);
  });
});
