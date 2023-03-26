import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import { RadioWithDecorator } from './radio-component';

describe('RadioWithDecorator', () => {
  const props = {
    name: 'radio-group',
    title: 'Radio Group',
    values: ['Option 1', 'Option 2'],
  };

  it('should render the component', () => {
    render(<RadioWithDecorator {...props} />);
    const legend = screen.queryAllByText(props.title);
    expect(legend.length).toBe(2);
  });

  it('should render the component with ref', () => {
    const ref0 = createRef<HTMLInputElement>();
    const ref1 = createRef<HTMLInputElement>();
    render(<RadioWithDecorator {...props} forwardedRefs={[ref0, ref1]} />);
    const legend = screen.queryAllByText(props.title);
    expect(legend.length).toBe(2);
    const radios = screen.queryAllByRole('radio');

    const firstRadio = radios[0];
    fireEvent.click(firstRadio);

    // Check that the first radio button is selected
    expect(ref0.current?.checked).toBe(true);
    expect(ref1.current?.checked).toBe(false);
  });
});
